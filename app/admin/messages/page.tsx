import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { AdminMessagesClient, MesajRow, ImhaRow } from '@/components/admin/AdminMessagesClient';

export const dynamic = 'force-dynamic';

// Server Action: Mark Message as Read (UPDATE)
async function okunduYapAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    if (!id) return;

    await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
}

// Server Action: Delete Message (DELETE)
async function mesajSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    if (!id) return;

    await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
}

// Server Action: Anonymize Messages Older than 1 Year (WITH ... RETURNING)
async function anonimlestirAction() {
    'use server';
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

    revalidatePath('/admin/messages');
}

export default async function MessagesPage() {
    await requireAdmin();

    let mesajlar: MesajRow[] = [];
    let imhaKayitlari: ImhaRow[] = [];

    try {
        const rows = await sql`
            SELECT * FROM iletisim_mesajlari 
            ORDER BY gonderim_zamani DESC
        `;
        mesajlar = rows as unknown as MesajRow[];
    } catch (e) {
        console.error('Failed to load messages:', e);
    }

    try {
        const imhaRows = await sql`
            SELECT * FROM imha_kayitlari 
            ORDER BY zaman DESC LIMIT 5
        `;
        imhaKayitlari = imhaRows as unknown as ImhaRow[];
    } catch {
        imhaKayitlari = [];
    }

    return (
        <AdminMessagesClient
            mesajlar={mesajlar}
            imhaKayitlari={imhaKayitlari}
            onMarkRead={okunduYapAction}
            onDelete={mesajSilAction}
            onAnonymize={anonimlestirAction}
        />
    );
}
