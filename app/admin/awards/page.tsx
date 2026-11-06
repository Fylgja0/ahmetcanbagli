import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { toggleAwardsVisibilityAction } from '@/app/actions/settings';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AdminAwardsClient, OdulRow, KategoriRow } from '@/components/admin/AdminAwardsClient';

export const dynamic = 'force-dynamic';

interface AwardsAdminPageProps {
    searchParams?: Promise<{ edit?: string }>;
}

// Server Action: Add New Award (INSERT)
async function odulEkleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const ad = formData.get('ad')?.toString().trim();
    const veren_kurum = formData.get('veren_kurum')?.toString().trim() || null;
    const tarih = formData.get('tarih')?.toString() || null;
    const dereceRaw = formData.get('derece')?.toString().trim();
    const derece = dereceRaw ? parseInt(dereceRaw, 10) : null;
    const aciklama = formData.get('aciklama')?.toString().trim() || null;
    const kategoriIdRaw = formData.get('kategori_id')?.toString().trim();
    const kategori_id = kategoriIdRaw ? parseInt(kategoriIdRaw, 10) : null;

    if (!ad) return;

    await sql`
        INSERT INTO oduller (ad, veren_kurum, tarih, derece, aciklama, kategori_id, yayinda)
        VALUES (${ad}, ${veren_kurum}, ${tarih}, ${derece}, ${aciklama}, ${kategori_id}, true)
    `;

    revalidatePath('/admin/awards');
    revalidatePath('/admin');
    revalidatePath('/awards');
    revalidatePath('/');
}

// Server Action: Update Award (UPDATE)
async function odulGuncelleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const ad = formData.get('ad')?.toString().trim();
    const veren_kurum = formData.get('veren_kurum')?.toString().trim() || null;
    const tarih = formData.get('tarih')?.toString() || null;
    const dereceRaw = formData.get('derece')?.toString().trim();
    const derece = dereceRaw ? parseInt(dereceRaw, 10) : null;
    const aciklama = formData.get('aciklama')?.toString().trim() || null;
    const kategoriIdRaw = formData.get('kategori_id')?.toString().trim();
    const kategori_id = kategoriIdRaw ? parseInt(kategoriIdRaw, 10) : null;

    if (!id || !ad) return;

    await sql`
        UPDATE oduller
        SET ad = ${ad},
            veren_kurum = ${veren_kurum},
            tarih = ${tarih},
            derece = ${derece},
            aciklama = ${aciklama},
            kategori_id = ${kategori_id}
        WHERE id = ${id}
    `;

    revalidatePath('/admin/awards');
    revalidatePath('/admin');
    revalidatePath('/awards');
    revalidatePath('/');
    redirect('/admin/awards');
}

// Server Action: Toggle Published Status (UPDATE toggle)
async function toggleYayindaAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE oduller SET yayinda = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/awards');
    revalidatePath('/admin');
    revalidatePath('/awards');
    revalidatePath('/');
}

// Server Action: Delete Award (DELETE)
async function odulSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    await sql`DELETE FROM oduller WHERE id = ${id}`;

    revalidatePath('/admin/awards');
    revalidatePath('/admin');
    revalidatePath('/awards');
    revalidatePath('/');
}

export default async function AwardsAdminPage(props: AwardsAdminPageProps) {
    await requireAdmin();

    const searchParams = await props.searchParams;
    const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

    let oduller: OdulRow[] = [];
    let kategoriler: KategoriRow[] = [];
    let editKayit: OdulRow | null = null;
    let awardsVisible = true;

    try {
        const [odulRes, katRes, editRes, visibility] = await Promise.all([
            sql`
                SELECT o.*, ot.ad AS kategori_adi 
                FROM oduller o
                LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
                ORDER BY o.tarih DESC NULLS LAST, o.id DESC
            `,
            sql`SELECT * FROM odul_turleri ORDER BY ad ASC`,
            editId ? sql`SELECT * FROM oduller WHERE id = ${editId}` : Promise.resolve([]),
            getAwardsVisibility()
        ]);

        oduller = odulRes as unknown as OdulRow[];
        kategoriler = katRes as unknown as KategoriRow[];
        editKayit = (editRes?.[0] as unknown as OdulRow) || null;
        awardsVisible = visibility;
    } catch (e) {
        console.error('Failed to load awards:', e);
    }

    return (
        <AdminAwardsClient
            oduller={oduller}
            kategoriler={kategoriler}
            editKayit={editKayit}
            awardsVisible={awardsVisible}
            onToggleVisibility={toggleAwardsVisibilityAction}
            onAdd={odulEkleAction}
            onUpdate={odulGuncelleAction}
            onTogglePublish={toggleYayindaAction}
            onDelete={odulSilAction}
        />
    );
}
