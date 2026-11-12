'use server';

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { getClientFallbackFingerprint, getClientIp } from '@/lib/auth';

export type ContactErrorCode =
  | 'validation_required'
  | 'validation_name'
  | 'validation_email'
  | 'validation_subject'
  | 'validation_message'
  | 'validation_consent'
  | 'rate_limited'
  | 'server_error';

export interface ContactActionResult {
  success: boolean;
  message?: string;
  error?: string;
  errorCode?: ContactErrorCode;
}

const MAX_CONTACT_SUBMISSIONS = 5;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 150;
const MIN_MESSAGE_LENGTH = 5;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUCCESS_MESSAGE =
  'Your message has been saved to the database. We will get back to you shortly.';

/**
 * Resolves the rate-limiting key for the current request:
 * - Requires `CONTACT_RATE_LIMIT_SECRET` to be configured; throws (fail-closed) if missing.
 * - Uses HMAC-SHA256 (`contact:ip:<hmac>`) when a trusted platform IP (`x-vercel-forwarded-for` on Vercel)
 *   is available so raw client IP addresses are never stored in the database.
 * - Falls back to `contact:noip:<fallbackFingerprint>` when IP cannot be determined, avoiding both a single
 *   global `unknown-ip` lock across all users and complete rate-limit bypass.
 */
async function resolveContactRateLimitKey(): Promise<string> {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET?.trim();
  if (!secret) {
    throw new Error('Rate limit secret is not configured');
  }

  const clientIp = await getClientIp();
  if (clientIp) {
    const ipDigest = crypto
      .createHmac('sha256', secret)
      .update(clientIp)
      .digest('hex');
    return `contact:ip:${ipDigest}`;
  }
  const fallbackFingerprint = await getClientFallbackFingerprint();
  return `contact:noip:${fallbackFingerprint}`;
}

/**
 * Atomically consumes 1 submission slot within a 10-minute window in `iletisim_limitleri`.
 * Concurrent requests on the same `anahtar` are serialized by PostgreSQL row-level locking on
 * `ON CONFLICT (anahtar) DO UPDATE`, preventing race-condition bypasses.
 * When `gonderim_sayisi` has already reached `MAX_CONTACT_SUBMISSIONS` (5) inside the active
 * 10-minute window, the `WHERE` clause rejects the update and returns 0 rows (`false`).
 */
async function consumeContactRateLimit(rateKey: string): Promise<boolean> {
  const rows = await sql`
    INSERT INTO iletisim_limitleri (anahtar, gonderim_sayisi, pencere_baslangic, son_gonderim)
    VALUES (${rateKey}, 1, now(), now())
    ON CONFLICT (anahtar) DO UPDATE SET
      gonderim_sayisi = CASE
        WHEN iletisim_limitleri.pencere_baslangic <= now() - interval '10 minutes'
        THEN 1
        ELSE iletisim_limitleri.gonderim_sayisi + 1
      END,
      pencere_baslangic = CASE
        WHEN iletisim_limitleri.pencere_baslangic <= now() - interval '10 minutes'
        THEN now()
        ELSE iletisim_limitleri.pencere_baslangic
      END,
      son_gonderim = now()
    WHERE iletisim_limitleri.pencere_baslangic <= now() - interval '10 minutes'
       OR iletisim_limitleri.gonderim_sayisi < ${MAX_CONTACT_SUBMISSIONS}
    RETURNING gonderim_sayisi
  `;

  if (!rows || rows.length === 0) {
    return false;
  }

  const row = rows[0] as { gonderim_sayisi?: number };
  const count = Number(row.gonderim_sayisi ?? MAX_CONTACT_SUBMISSIONS);
  return count <= MAX_CONTACT_SUBMISSIONS;
}

/**
 * Opportunistically purges expired contact rate-limit entries (>10 minutes old)
 * so `iletisim_limitleri` does not grow unboundedly.
 */
async function purgeExpiredContactRateLimits(): Promise<void> {
  try {
    await sql`
      DELETE FROM iletisim_limitleri
      WHERE pencere_baslangic <= now() - interval '10 minutes'
    `;
  } catch {
    // Non-fatal maintenance cleanup; primary rate-limit check remains strictly fail-closed.
  }
}

export async function sendMessageAction(
  prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  try {
    // 1. Honeypot check: if the hidden `website` field is filled by an automated bot,
    // silently discard the submission and return a normal success response.
    const rawHoneypot = formData.get('website');
    const honeypot =
      typeof rawHoneypot === 'string' ? rawHoneypot.trim() : '';

    if (honeypot.length > 0) {
      return {
        success: true,
        message: SUCCESS_MESSAGE,
      };
    }

    // 2. Extract and normalize form fields
    const rawName = formData.get('name') ?? formData.get('ad_soyad');
    const rawEmail = formData.get('email') ?? formData.get('eposta');
    const rawSubject = formData.get('subject') ?? formData.get('konu');
    const rawMessage = formData.get('message') ?? formData.get('mesaj');

    const fullName =
      typeof rawName === 'string'
        ? rawName.replace(/[\r\n\0]+/g, ' ').trim()
        : '';
    const email =
      typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
    const subject =
      typeof rawSubject === 'string'
        ? rawSubject.replace(/[\r\n\0]+/g, ' ').trim()
        : '';
    const message =
      typeof rawMessage === 'string' ? rawMessage.replace(/\0/g, '').trim() : '';

    const consentGiven =
      formData.get('consent') === 'true' ||
      formData.get('consent') === 'on' ||
      formData.get('kvkk_onay') === 'true' ||
      formData.get('kvkk_onay') === 'on';

    // 3. Validate required fields on the server
    if (!fullName || !email || !message) {
      return {
        success: false,
        errorCode: 'validation_required',
        error: 'Please fill in your full name, email address, and message.',
      };
    }

    // 4. Validate field length and format constraints
    if (
      fullName.length < MIN_NAME_LENGTH ||
      fullName.length > MAX_NAME_LENGTH
    ) {
      return {
        success: false,
        errorCode: 'validation_name',
        error: 'Full name must be between 2 and 100 characters.',
      };
    }

    if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
      return {
        success: false,
        errorCode: 'validation_email',
        error: 'Please enter a valid email address (maximum 254 characters).',
      };
    }

    if (subject.length > MAX_SUBJECT_LENGTH) {
      return {
        success: false,
        errorCode: 'validation_subject',
        error: 'Subject cannot exceed 150 characters.',
      };
    }

    if (
      message.length < MIN_MESSAGE_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return {
        success: false,
        errorCode: 'validation_message',
        error: 'Message must be between 5 and 5000 characters.',
      };
    }

    // 5. Verify explicit data privacy (GDPR / KVKK) consent
    if (!consentGiven) {
      return {
        success: false,
        errorCode: 'validation_consent',
        error: 'Please accept the Data Privacy Notice before sending your message.',
      };
    }

    // 6. Atomically enforce server-side rate limit (5 submissions per 10 minutes, fail-closed)
    const rateKey = await resolveContactRateLimitKey();
    const isAllowed = await consumeContactRateLimit(rateKey);
    if (!isAllowed) {
      return {
        success: false,
        errorCode: 'rate_limited',
        error: 'Too many message submissions. Please wait a few minutes and try again.',
      };
    }

    // 7. Parameterized insert to prevent SQL injection
    await sql`
      INSERT INTO iletisim_mesajlari (ad_soyad, eposta, mesaj, kvkk_onay, okundu)
      VALUES (${fullName}, ${email}, ${message}, ${consentGiven}, false)
    `;

    // 8. Opportunistically clean up expired rate-limit entries and revalidate admin routes
    await purgeExpiredContactRateLimits();
    revalidatePath('/admin/messages');
    revalidatePath('/admin');

    return {
      success: true,
      message: SUCCESS_MESSAGE,
    };
  } catch (error) {
    console.error(
      'Contact message submission error (fail-closed):',
      error instanceof Error ? error.name : 'UnknownError'
    );
    return {
      success: false,
      errorCode: 'server_error',
      error: 'A server error occurred while sending your message. Please try again later.',
    };
  }
}
