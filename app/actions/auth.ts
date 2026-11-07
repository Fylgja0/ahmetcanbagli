'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import {
  getClientDevice,
  getClientFallbackFingerprint,
  getClientIp,
} from '@/lib/auth';

/**
 * Precomputed cost-10 bcrypt hash used for dummy comparison when a user record is not found.
 * Mitigates user enumeration via timing side-channels without generating a new hash per request.
 */
const DUMMY_BCRYPT_HASH = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

const MAX_EMAIL_LENGTH = 254;
const MAX_PASSWORD_UTF8_BYTES = 72;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_ACCOUNT_IP_ATTEMPTS = 5;
const MAX_IP_ATTEMPTS = 10;

interface AttemptReservationResult {
  allowed: boolean;
  reachedLimit: boolean;
}

/**
 * Atomically consumes a login attempt slot in PostgreSQL BEFORE `bcrypt.compare()` is invoked.
 * Serializes concurrent requests on `anahtar` primary key so parallel requests from the same IP
 * cannot bypass the 5-attempt (account+IP) or 10-attempt (IP) limits.
 * When a key is already locked (`kilit_bitis > now()` and `deneme_sayisi >= maxAttempts`),
 * the `WHERE` clause prevents the row from being updated or inflated and returns 0 rows (`allowed: false`).
 */
async function reserveAttemptKey(
  key: string,
  maxAttempts: number
): Promise<AttemptReservationResult> {
  const rows = await sql`
    INSERT INTO giris_denemeleri (anahtar, deneme_sayisi, ilk_deneme, son_deneme, kilit_bitis)
    VALUES (${key}, 1, now(), now(), NULL)
    ON CONFLICT (anahtar) DO UPDATE SET
      deneme_sayisi = CASE
        WHEN (giris_denemeleri.kilit_bitis IS NOT NULL AND giris_denemeleri.kilit_bitis <= now())
          OR (giris_denemeleri.kilit_bitis IS NULL AND giris_denemeleri.son_deneme < now() - interval '15 minutes')
        THEN 1
        ELSE giris_denemeleri.deneme_sayisi + 1
      END,
      ilk_deneme = CASE
        WHEN (giris_denemeleri.kilit_bitis IS NOT NULL AND giris_denemeleri.kilit_bitis <= now())
          OR (giris_denemeleri.kilit_bitis IS NULL AND giris_denemeleri.son_deneme < now() - interval '15 minutes')
        THEN now()
        ELSE giris_denemeleri.ilk_deneme
      END,
      son_deneme = now(),
      kilit_bitis = CASE
        WHEN (giris_denemeleri.kilit_bitis IS NOT NULL AND giris_denemeleri.kilit_bitis <= now())
          OR (giris_denemeleri.kilit_bitis IS NULL AND giris_denemeleri.son_deneme < now() - interval '15 minutes')
        THEN NULL
        WHEN (giris_denemeleri.deneme_sayisi + 1) >= ${maxAttempts}
        THEN now() + interval '15 minutes'
        ELSE NULL
      END
    WHERE (giris_denemeleri.kilit_bitis IS NULL OR giris_denemeleri.kilit_bitis <= now())
      AND (
        giris_denemeleri.deneme_sayisi < ${maxAttempts}
        OR (giris_denemeleri.kilit_bitis IS NOT NULL AND giris_denemeleri.kilit_bitis <= now())
        OR (giris_denemeleri.kilit_bitis IS NULL AND giris_denemeleri.son_deneme < now() - interval '15 minutes')
      )
    RETURNING deneme_sayisi, kilit_bitis
  `;

  if (!rows || rows.length === 0) {
    return {
      allowed: false,
      reachedLimit: true,
    };
  }

  const row = rows[0] as {
    deneme_sayisi?: number;
    kilit_bitis?: string | Date | null;
  };
  const count = Number(row.deneme_sayisi ?? maxAttempts);

  return {
    allowed: count <= maxAttempts,
    reachedLimit: count >= maxAttempts,
  };
}

async function releaseReservedSlot(
  key: string,
  maxAttempts: number
): Promise<void> {
  await sql`
    UPDATE giris_denemeleri
    SET deneme_sayisi = GREATEST(deneme_sayisi - 1, 0),
        kilit_bitis = CASE
          WHEN GREATEST(deneme_sayisi - 1, 0) < ${maxAttempts} THEN NULL
          ELSE kilit_bitis
        END
    WHERE anahtar = ${key}
  `;
}

async function tryRollbackAccountReservation(acctKey: string): Promise<void> {
  try {
    await releaseReservedSlot(acctKey, MAX_ACCOUNT_IP_ATTEMPTS);
  } catch (rollbackErr) {
    console.error(
      'Failed to roll back account rate-limit reservation after IP reservation failure:',
      rollbackErr
    );
  }
}

/**
 * Reserves an attempt across both Account+Context and IP (when available) keys prior to password hashing.
 * If IP reservation fails due to rate limit or throws a SQL error, rolls back the account reservation
 * while preserving fail-closed behavior and rethrowing the original SQL error.
 */
async function consumeLoginAttempt(
  ipKey: string | null,
  acctKey: string
): Promise<AttemptReservationResult> {
  const acctRes = await reserveAttemptKey(acctKey, MAX_ACCOUNT_IP_ATTEMPTS);
  if (!acctRes.allowed) {
    return { allowed: false, reachedLimit: true };
  }

  let ipReachedLimit = false;
  if (ipKey) {
    let ipRes: AttemptReservationResult;
    try {
      ipRes = await reserveAttemptKey(ipKey, MAX_IP_ATTEMPTS);
    } catch (ipErr) {
      await tryRollbackAccountReservation(acctKey);
      throw ipErr;
    }

    if (!ipRes.allowed) {
      await tryRollbackAccountReservation(acctKey);
      return { allowed: false, reachedLimit: true };
    }
    ipReachedLimit = ipRes.reachedLimit;
  }

  return {
    allowed: true,
    reachedLimit: acctRes.reachedLimit || ipReachedLimit,
  };
}

/**
 * Purges expired rate-limit entries as a separate maintenance step.
 */
async function purgeExpiredRateLimitEntries(): Promise<void> {
  await sql`
    DELETE FROM giris_denemeleri
    WHERE (kilit_bitis IS NOT NULL AND kilit_bitis <= now())
       OR (kilit_bitis IS NULL AND son_deneme < now() - interval '15 minutes')
  `;
}

/**
 * On successful login:
 * 1. Releases only the 1 reserved slot on `acctKey` via `releaseReservedSlot` (preserving any concurrent or prior failed reservations on the same account).
 * 2. Releases the 1 reserved slot on `ipKey` via `releaseReservedSlot` (preserving failed attempts made from the same IP).
 * 3. Separately purges expired rate-limit records.
 */
async function releaseSuccessfulLoginAttempt(
  ipKey: string | null,
  acctKey: string
): Promise<void> {
  await releaseReservedSlot(acctKey, MAX_ACCOUNT_IP_ATTEMPTS);

  if (ipKey) {
    await releaseReservedSlot(ipKey, MAX_IP_ATTEMPTS);
  }

  await purgeExpiredRateLimitEntries();
}

export async function loginAction(formData: FormData): Promise<void> {
  const rawEmail = formData.get('email') ?? formData.get('eposta');
  const rawPassword = formData.get('password') ?? formData.get('sifre');

  const email = typeof rawEmail === 'string' ? rawEmail.trim().toLowerCase() : '';
  const password = typeof rawPassword === 'string' ? rawPassword : '';

  if (
    !email ||
    !password ||
    email.length > MAX_EMAIL_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    redirect('/login?error=invalid_credentials');
  }

  const clientIp = await getClientIp();
  const emailHash = crypto.createHash('sha256').update(email).digest('hex');

  // When clientIp is unavailable, do NOT create a shared `ip:unknown-ip` bucket;
  // partition account attempts by client context fingerprint + emailHash instead.
  const ipKey = clientIp ? `ip:${clientIp}` : null;
  const acctKey = clientIp
    ? `acct:${clientIp}:${emailHash}`
    : `acct:noip:${await getClientFallbackFingerprint()}:${emailHash}`;

  try {
    // 1. Atomically reserve attempt & check rate limits BEFORE any password comparison (fail-closed)
    const reservation = await consumeLoginAttempt(ipKey, acctKey);
    if (!reservation.allowed) {
      redirect('/login?error=rate_limited');
    }

    // 2. Enforce bcrypt 72-byte UTF-8 limit before calling bcrypt.compare()
    const passwordByteLength = Buffer.byteLength(password, 'utf8');
    if (passwordByteLength > MAX_PASSWORD_UTF8_BYTES) {
      redirect(
        reservation.reachedLimit
          ? '/login?error=rate_limited'
          : '/login?error=invalid_credentials'
      );
    }

    // 3. Look up administrator by normalized email (case-insensitive)
    const users = await sql`
      SELECT id, eposta, sifre_hash
      FROM yoneticiler
      WHERE LOWER(TRIM(eposta)) = ${email}
      LIMIT 1
    `;

    const adminRow =
      users && users.length > 0
        ? (users[0] as { id: number; eposta: string; sifre_hash: string })
        : null;

    // 4. Constant-work password verification (mitigates timing-based user enumeration)
    const targetHash = adminRow ? adminRow.sifre_hash : DUMMY_BCRYPT_HASH;
    const isPasswordValid = await bcrypt.compare(password, targetHash);

    if (!adminRow || !isPasswordValid) {
      redirect(
        reservation.reachedLimit
          ? '/login?error=rate_limited'
          : '/login?error=invalid_credentials'
      );
    }

    // 5. Clear account rate-limit record & release reserved IP slot upon successful login
    await releaseSuccessfulLoginAttempt(ipKey, acctKey);

    // 6. Generate 2-hour random session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const userAgent = await getClientDevice();

    await sql`
      INSERT INTO oturumlar (token, yonetici_id, bitis, son_aktivite, cihaz)
      VALUES (${token}, ${adminRow.id}, ${expiresAt.toISOString()}, now(), ${userAgent})
    `;

    // 7. Set httpOnly, secure, sameSite cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
  } catch (err: unknown) {
    const errorObj = err as { message?: string; digest?: string };
    if (
      errorObj?.message?.includes('NEXT_REDIRECT') ||
      errorObj?.digest?.includes('NEXT_REDIRECT')
    ) {
      throw err;
    }
    console.error('Login security or database error (fail-closed):', err);
    redirect('/login?error=temporarily_unavailable');
  }

  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (token) {
    try {
      await sql`DELETE FROM oturumlar WHERE token = ${token}`;
    } catch (err) {
      console.error('Failed to delete session on logout:', err);
    }
    cookieStore.delete('admin_token');
  }

  redirect('/login');
}
