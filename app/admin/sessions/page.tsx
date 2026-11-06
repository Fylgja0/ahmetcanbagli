import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { AdminSessionsClient, OturumRow } from '@/components/admin/AdminSessionsClient';

export const dynamic = 'force-dynamic';

// Server Action: Revoke All Other Sessions
async function digerOturumlariKapatAction() {
    'use server';
    const admin = await requireAdmin();
    const cookieStore = await cookies();
    const currentToken = cookieStore.get('admin_token')?.value;

    if (admin && currentToken) {
        await sql`
            DELETE FROM oturumlar 
            WHERE yonetici_id = ${admin.id} AND token <> ${currentToken}
        `;
        revalidatePath('/admin/sessions');
        revalidatePath('/admin');
    }
}

// Server Action: Clean Expired Sessions
async function suresiDolanlariTemizleAction() {
    'use server';
    await requireAdmin();

    await sql`
        DELETE FROM oturumlar
        WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes'
    `;

    revalidatePath('/admin/sessions');
    revalidatePath('/admin');
}

export default async function SessionsPage() {
    const admin = await requireAdmin();
    if (!admin) return null;

    const cookieStore = await cookies();
    const currentToken = cookieStore.get('admin_token')?.value;

    let oturumlar: OturumRow[] = [];

    try {
        const rows = await sql`
            SELECT * FROM oturumlar 
            WHERE yonetici_id = ${admin.id} 
              AND bitis > now()
              AND son_aktivite > now() - interval '30 minutes'
            ORDER BY son_aktivite DESC
        `;
        oturumlar = rows as unknown as OturumRow[];
    } catch (e) {
        console.error('Failed to load active sessions:', e);
    }

    return (
        <AdminSessionsClient
            oturumlar={oturumlar}
            currentToken={currentToken}
            onPurgeExpired={suresiDolanlariTemizleAction}
            onRevokeOthers={digerOturumlariKapatAction}
        />
    );
}
