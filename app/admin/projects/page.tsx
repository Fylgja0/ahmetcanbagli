import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureDefaultProjectsSeeded } from '@/app/actions/projects';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AdminProjectsClient, ProjeRow } from '@/components/admin/AdminProjectsClient';

export const dynamic = 'force-dynamic';

interface ProjectsPageProps {
    searchParams?: Promise<{ edit?: string }>;
}

// Server Action: Add Project (INSERT)
async function projeEkleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const baslik = formData.get('baslik')?.toString().trim();
    const kategori = formData.get('kategori')?.toString().trim() || 'backend';
    const github_url = formData.get('github_url')?.toString().trim() || null;
    const canli_url = formData.get('canli_url')?.toString().trim() || null;
    const teknolojiler = formData.get('teknolojiler')?.toString().trim() || null;
    const aciklama = formData.get('aciklama')?.toString().trim();
    const detay = formData.get('detay')?.toString().trim() || null;
    const one_cikan = formData.get('one_cikan') === 'on' || formData.get('one_cikan') === 'true';
    const sira = parseInt(formData.get('sira')?.toString() || '0', 10);

    if (!baslik || !aciklama) return;

    // Slug generation
    const slug = baslik
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `project-${Date.now()}`;

    await sql`
        INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
        VALUES (${slug}, ${baslik}, ${kategori}, ${github_url}, ${canli_url}, ${teknolojiler}, ${aciklama}, ${detay}, ${one_cikan}, ${sira}, true)
    `;

    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Update Project (UPDATE)
async function projeGuncelleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const baslik = formData.get('baslik')?.toString().trim();
    const kategori = formData.get('kategori')?.toString().trim() || 'backend';
    const github_url = formData.get('github_url')?.toString().trim() || null;
    const canli_url = formData.get('canli_url')?.toString().trim() || null;
    const teknolojiler = formData.get('teknolojiler')?.toString().trim() || null;
    const aciklama = formData.get('aciklama')?.toString().trim();
    const detay = formData.get('detay')?.toString().trim() || null;
    const one_cikan = formData.get('one_cikan') === 'on' || formData.get('one_cikan') === 'true';
    const sira = parseInt(formData.get('sira')?.toString() || '0', 10);

    if (!id || !baslik || !aciklama) return;

    await sql`
        UPDATE projeler
        SET baslik = ${baslik},
            kategori = ${kategori},
            github_url = ${github_url},
            canli_url = ${canli_url},
            teknolojiler = ${teknolojiler},
            aciklama = ${aciklama},
            detay = ${detay},
            one_cikan = ${one_cikan},
            sira = ${sira}
        WHERE id = ${id}
    `;

    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
    redirect('/admin/projects');
}

// Server Action: Toggle Published Status (UPDATE)
async function toggleYayindaAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE projeler SET yayinda = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Toggle Featured Status (UPDATE)
async function toggleOneCikanAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE projeler SET one_cikan = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Delete Project (DELETE)
async function projeSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    await sql`DELETE FROM projeler WHERE id = ${id}`;

    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

export default async function ProjectsPage(props: ProjectsPageProps) {
    await requireAdmin();

    const searchParams = await props.searchParams;
    const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

    let projeler: ProjeRow[] = [];
    let editKayit: ProjeRow | null = null;

    try {
        await ensureDefaultProjectsSeeded();

        const [projeRes, editRes] = await Promise.all([
            sql`SELECT * FROM projeler ORDER BY sira ASC, id ASC`,
            editId ? sql`SELECT * FROM projeler WHERE id = ${editId}` : Promise.resolve([])
        ]);

        projeler = projeRes as unknown as ProjeRow[];
        editKayit = (editRes?.[0] as unknown as ProjeRow) || null;
    } catch (e) {
        console.error('Failed to load projects:', e);
    }

    return (
        <AdminProjectsClient
            projeler={projeler}
            editKayit={editKayit}
            onAdd={projeEkleAction}
            onUpdate={projeGuncelleAction}
            onTogglePublish={toggleYayindaAction}
            onToggleFeatured={toggleOneCikanAction}
            onDelete={projeSilAction}
        />
    );
}
