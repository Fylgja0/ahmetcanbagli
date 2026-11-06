'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { AdminSession } from '@/types/admin';

interface RawSessionRow {
  token: string;
  yonetici_id: number;
  bitis: string | Date;
  son_aktivite: string | Date;
  cihaz: string | null;
}

export async function getAdminSessionsData(): Promise<{
  sessions: AdminSession[];
  currentToken?: string;
}> {
  const admin = await requireAdmin();
  const cookieStore = await cookies();
  const currentToken = cookieStore.get('admin_token')?.value;

  let sessions: AdminSession[] = [];

  try {
    const rows = (await sql`
      SELECT * FROM oturumlar
      WHERE yonetici_id = ${admin.id}
        AND bitis > now()
        AND son_aktivite > now() - interval '30 minutes'
      ORDER BY son_aktivite DESC
    `) as unknown as RawSessionRow[];

    sessions = rows.map((row) => ({
      token: row.token,
      adminId: Number(row.yonetici_id),
      expiresAt: String(row.bitis),
      lastActiveAt: String(row.son_aktivite),
      userAgent: row.cihaz ?? null,
    }));
  } catch (e) {
    console.error('Failed to load active sessions:', e);
  }

  return { sessions, currentToken };
}

function revalidateSessionPaths() {
  revalidatePath('/admin/sessions');
  revalidatePath('/admin');
}

export async function revokeOtherSessionsAction(): Promise<void> {
  const admin = await requireAdmin();
  const cookieStore = await cookies();
  const currentToken = cookieStore.get('admin_token')?.value;

  if (admin && currentToken) {
    await sql`
      DELETE FROM oturumlar
      WHERE yonetici_id = ${admin.id} AND token <> ${currentToken}
    `;
    revalidateSessionPaths();
  }
}

export async function purgeExpiredSessionsAction(): Promise<void> {
  await requireAdmin();

  await sql`
    DELETE FROM oturumlar
    WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes'
  `;

  revalidateSessionPaths();
}
