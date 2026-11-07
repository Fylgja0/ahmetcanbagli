'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ContactMessage, DeletionAuditLog } from '@/types/admin';

interface RawMessageRow {
  id: number;
  ad_soyad: string;
  eposta: string;
  mesaj: string;
  kvkk_onay: boolean;
  okundu: boolean;
  gonderim_zamani: string | Date;
}

interface RawDeletionAuditRow {
  id: number;
  adet: number;
  zaman: string | Date;
}

function mapRowToMessage(row: RawMessageRow): ContactMessage {
  return {
    id: Number(row.id),
    fullName: row.ad_soyad,
    email: row.eposta,
    message: row.mesaj,
    consentGiven: Boolean(row.kvkk_onay),
    isRead: Boolean(row.okundu),
    createdAt: String(row.gonderim_zamani),
  };
}

function mapRowToAuditLog(row: RawDeletionAuditRow): DeletionAuditLog {
  return {
    id: Number(row.id),
    anonymizedCount: Number(row.adet),
    executedAt: String(row.zaman),
  };
}

export async function getAdminMessagesData(): Promise<{
  messages: ContactMessage[];
  auditLogs: DeletionAuditLog[];
}> {
  await requireAdmin();

  let messages: ContactMessage[] = [];
  let auditLogs: DeletionAuditLog[] = [];

  try {
    const rows = (await sql`
      SELECT * FROM iletisim_mesajlari
      ORDER BY gonderim_zamani DESC
    `) as unknown as RawMessageRow[];
    messages = rows.map(mapRowToMessage);
  } catch (e) {
    console.error('Failed to load messages:', e);
  }

  try {
    const auditRows = (await sql`
      SELECT * FROM imha_kayitlari
      ORDER BY zaman DESC
      LIMIT 5
    `) as unknown as RawDeletionAuditRow[];
    auditLogs = auditRows.map(mapRowToAuditLog);
  } catch {
    auditLogs = [];
  }

  return { messages, auditLogs };
}

function revalidateMessagePaths() {
  revalidatePath('/admin/messages');
  revalidatePath('/admin');
}

export async function markMessageReadAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  if (!id) return;

  await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
  revalidateMessagePaths();
}

export async function deleteMessageAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  if (!id) return;

  await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
  revalidateMessagePaths();
}

export async function anonymizeExpiredMessagesAction(): Promise<void> {
  await requireAdmin();

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS imha_kayitlari (
        id SERIAL PRIMARY KEY,
        adet INT NOT NULL,
        zaman TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;

    await sql`
      WITH anonimlestirilenler AS (
        UPDATE iletisim_mesajlari
        SET ad_soyad = 'Anonim',
            eposta = 'anonim@example.invalid',
            mesaj = '[anonymized]'
        WHERE gonderim_zamani < now() - interval '1 year'
        RETURNING id
      )
      INSERT INTO imha_kayitlari (adet, zaman)
      SELECT COUNT(*), now() FROM anonimlestirilenler;
    `;
  } catch (err) {
    console.error('Anonymization error:', err);
  }

  revalidateMessagePaths();
}
