import 'server-only';
import crypto from 'crypto';
import { isIP } from 'net';
import { sql } from './db';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminUser } from '@/types/admin';

export type { AdminUser };

interface DbAdminJoinRow {
  id: number;
  eposta: string;
}

/**
 * Retrieves the currently authenticated administrator and validates session expiration (30-min inactivity limit).
 */
export async function getAdmin(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return null;

    // Sessions expire after their hard limit or after 30 minutes of inactivity
    const rows = await sql`
      SELECT y.id, y.eposta FROM oturumlar o
      JOIN yoneticiler y ON y.id = o.yonetici_id
      WHERE o.token = ${token}
        AND o.bitis > now()
        AND o.son_aktivite > now() - interval '30 minutes'
    `;

    if (rows && rows.length > 0) {
      const row = rows[0] as unknown as DbAdminJoinRow;
      await sql`UPDATE oturumlar SET son_aktivite = now() WHERE token = ${token}`;
      return {
        id: row.id,
        email: row.eposta,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Extracts the client User-Agent header for session auditing.
 */
export async function getClientDevice(): Promise<string> {
  const headersList = await headers();
  return headersList.get('user-agent') || 'Unknown Device';
}

/**
 * Extracts the client IP address only when a trusted platform header is available.
 *
 * Security notes (Proxy Trust vs. Syntax Validation):
 * 1. Proxy Trust: Generic reverse-proxy headers (`x-forwarded-for`, `x-real-ip`) can be
 *    spoofed by clients unless overwritten by a trusted edge proxy, so they are NOT used
 *    directly as trusted IP sources here. On Vercel deployments (`process.env.VERCEL === '1'`),
 *    the platform edge network populates `x-vercel-forwarded-for`.
 * 2. Syntax Validation: `net.isIP()` only validates that the string is a well-formed IPv4/IPv6
 *    literal; it does NOT prove header authenticity or origin trust.
 * 3. Missing IP: Returns `null` when no trusted IP source is present so callers do not merge
 *    unrelated users into a shared `unknown-ip` bucket.
 */
export async function getClientIp(): Promise<string | null> {
  if (process.env.VERCEL !== '1') {
    return null;
  }

  const headersList = await headers();
  const vercelForwardedFor = headersList.get('x-vercel-forwarded-for');
  if (!vercelForwardedFor) {
    return null;
  }

  const firstHop = vercelForwardedFor.split(',')[0]?.trim();
  if (firstHop && firstHop.length <= 64 && isIP(firstHop) !== 0) {
    return firstHop;
  }

  return null;
}

/**
 * Generates a coarse client-context hash from `User-Agent` and `Accept-Language`.
 *
 * Limitation notice:
 * - This is NOT a true device identifier or cryptographic client identity (both headers are
 *   client-controlled and shared across similar browsers).
 * - It is a weak fallback used strictly when `getClientIp()` returns `null` to partition
 *   per-account rate-limit keys (`acct:noip:<fingerprint>:<emailHash>`), avoiding both a
 *   shared `ip:unknown-ip` bucket across different accounts and a global email-only lock.
 */
export async function getClientFallbackFingerprint(): Promise<string> {
  const headersList = await headers();
  const ua = (headersList.get('user-agent') || 'unknown-ua').trim().slice(0, 256);
  const lang = (headersList.get('accept-language') || 'unknown-lang').trim().slice(0, 128);
  return crypto
    .createHash('sha256')
    .update(`${ua}|${lang}`)
    .digest('hex')
    .slice(0, 32);
}

/**
 * Enforces administrator authentication for protected pages and Server Actions.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) {
    redirect('/login');
  }
  return admin;
}
