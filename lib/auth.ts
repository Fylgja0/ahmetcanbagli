import 'server-only';
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
 * Enforces administrator authentication for protected pages and Server Actions.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdmin();
  if (!admin) {
    redirect('/login');
  }
  return admin;
}
