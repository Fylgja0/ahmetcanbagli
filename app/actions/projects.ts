'use server';

import { sql } from '@/lib/db';
import { Project } from '@/types/portfolio';
import { FEATURED_PROJECTS } from '@/lib/data';
import { DbProjectRow, mapRowToProject } from '@/lib/projects';

// Tablo boş ise varsayılan 3 projeyi otomatik tohumla (seed)
export async function ensureDefaultProjectsSeeded(): Promise<void> {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS projeler (
                id SERIAL PRIMARY KEY,
                slug TEXT,
                baslik TEXT NOT NULL,
                kategori TEXT NOT NULL DEFAULT 'backend',
                github_url TEXT,
                canli_url TEXT,
                teknolojiler TEXT,
                aciklama TEXT NOT NULL,
                detay TEXT,
                one_cikan BOOLEAN NOT NULL DEFAULT true,
                sira INT NOT NULL DEFAULT 0,
                yayinda BOOLEAN NOT NULL DEFAULT true,
                ek_bilgiler JSONB,
                olusturma TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `;

        await sql`ALTER TABLE projeler ADD COLUMN IF NOT EXISTS slug TEXT`;
        await sql`ALTER TABLE projeler ADD COLUMN IF NOT EXISTS ek_bilgiler JSONB`;

        const countRes = await sql`SELECT COUNT(*)::int AS count FROM projeler`;
        const count = countRes?.[0]?.count || 0;

        if (count === 0) {
            for (let i = 0; i < FEATURED_PROJECTS.length; i++) {
                const p = FEATURED_PROJECTS[i];
                const techStr = p.technologies.join(', ');
                const aciklama = p.tagline.tr || p.tagline.en;
                const detay = p.overview.tr || p.overview.en;

                await sql`
                    INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
                    VALUES (${p.slug}, ${p.title}, ${p.category}, ${p.githubUrl}, ${p.liveUrl || null}, ${techStr}, ${aciklama}, ${detay}, true, ${i + 1}, true)
                `;
            }
        }
    } catch (e) {
        console.error('ensureDefaultProjectsSeeded error:', e);
    }
}

// Sitede (/projects) ve ana sayfada gösterilecek canlı projeler
export async function getLiveProjects(): Promise<Project[]> {
    try {
        await ensureDefaultProjectsSeeded();

        const rows = await sql`
            SELECT * FROM projeler 
            WHERE yayinda = true 
            ORDER BY one_cikan DESC, sira ASC, id ASC
        `;

        return (rows as unknown as DbProjectRow[]).map(mapRowToProject);
    } catch (e) {
        console.error('getLiveProjects error:', e);
        return FEATURED_PROJECTS;
    }
}
