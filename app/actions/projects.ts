'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { FEATURED_PROJECTS } from '@/lib/data';
import {
  DbProjectRow,
  mapRowToProject,
  mapRowToProjectRecord,
} from '@/lib/projects';
import { generateSlug } from '@/lib/utils';
import { Project } from '@/types/portfolio';
import { ProjectRecord } from '@/types/admin';

/**
 * Returns live published projects for `/projects` and the home page.
 * Falls back to static `FEATURED_PROJECTS` if the database is unreachable.
 */
export async function getLiveProjects(): Promise<Project[]> {
  try {
    const rows = (await sql`
      SELECT * FROM projeler
      WHERE yayinda = true
      ORDER BY one_cikan DESC, sira ASC, id ASC
    `) as unknown as DbProjectRow[];

    return rows.map(mapRowToProject);
  } catch (e) {
    console.error('getLiveProjects error, falling back to static projects:', e);
    return FEATURED_PROJECTS;
  }
}

/**
 * Fetches all project records and optional editing target for the Admin Panel.
 */
export async function getAdminProjectsData(editId: number | null): Promise<{
  projects: ProjectRecord[];
  editingProject: ProjectRecord | null;
}> {
  await requireAdmin();

  try {
    const rows = (await sql`
      SELECT * FROM projeler
      ORDER BY sira ASC, id ASC
    `) as unknown as DbProjectRow[];

    const projects = rows.map(mapRowToProjectRecord);
    const editingProject =
      editId && !Number.isNaN(editId)
        ? (projects.find((p) => p.id === editId) ?? null)
        : null;

    return { projects, editingProject };
  } catch (e) {
    console.error('Failed to load projects for admin panel:', e);
    return { projects: [], editingProject: null };
  }
}

function revalidateProjectPaths() {
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/projects');
  revalidatePath('/');
}

export async function createProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const title = (formData.get('title') || formData.get('baslik'))?.toString().trim();
  const category =
    (formData.get('category') || formData.get('kategori'))?.toString().trim() ||
    'backend';
  const githubUrl =
    (formData.get('githubUrl') || formData.get('github_url'))?.toString().trim() ||
    null;
  const liveUrl =
    (formData.get('liveUrl') || formData.get('canli_url'))?.toString().trim() ||
    null;
  const technologies =
    (formData.get('technologies') || formData.get('teknolojiler'))
      ?.toString()
      .trim() || null;
  const summary = (formData.get('summary') || formData.get('aciklama'))
    ?.toString()
    .trim();
  const details =
    (formData.get('details') || formData.get('detay'))?.toString().trim() || null;
  const isFeatured =
    formData.get('isFeatured') === 'on' ||
    formData.get('isFeatured') === 'true' ||
    formData.get('one_cikan') === 'on' ||
    formData.get('one_cikan') === 'true';
  const sortOrder = parseInt(
    (formData.get('sortOrder') || formData.get('sira'))?.toString() || '0',
    10
  );

  if (!title || !summary) return;

  const slug = generateSlug(title);

  await sql`
    INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
    VALUES (${slug}, ${title}, ${category}, ${githubUrl}, ${liveUrl}, ${technologies}, ${summary}, ${details}, ${isFeatured}, ${sortOrder}, true)
  `;

  revalidateProjectPaths();
}

export async function updateProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const title = (formData.get('title') || formData.get('baslik'))?.toString().trim();
  const category =
    (formData.get('category') || formData.get('kategori'))?.toString().trim() ||
    'backend';
  const githubUrl =
    (formData.get('githubUrl') || formData.get('github_url'))?.toString().trim() ||
    null;
  const liveUrl =
    (formData.get('liveUrl') || formData.get('canli_url'))?.toString().trim() ||
    null;
  const technologies =
    (formData.get('technologies') || formData.get('teknolojiler'))
      ?.toString()
      .trim() || null;
  const summary = (formData.get('summary') || formData.get('aciklama'))
    ?.toString()
    .trim();
  const details =
    (formData.get('details') || formData.get('detay'))?.toString().trim() || null;
  const isFeatured =
    formData.get('isFeatured') === 'on' ||
    formData.get('isFeatured') === 'true' ||
    formData.get('one_cikan') === 'on' ||
    formData.get('one_cikan') === 'true';
  const sortOrder = parseInt(
    (formData.get('sortOrder') || formData.get('sira'))?.toString() || '0',
    10
  );

  if (!id || !title || !summary) return;

  await sql`
    UPDATE projeler
    SET baslik = ${title},
        kategori = ${category},
        github_url = ${githubUrl},
        canli_url = ${liveUrl},
        teknolojiler = ${technologies},
        aciklama = ${summary},
        detay = ${details},
        one_cikan = ${isFeatured},
        sira = ${sortOrder}
    WHERE id = ${id}
  `;

  revalidateProjectPaths();
  redirect('/admin/projects');
}

export async function toggleProjectPublishAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const currentState =
    (formData.get('currentState') ?? formData.get('mevcut')) === 'true';

  if (!id) return;

  await sql`UPDATE projeler SET yayinda = ${!currentState} WHERE id = ${id}`;

  revalidateProjectPaths();
}

export async function toggleProjectFeaturedAction(
  formData: FormData
): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const currentState =
    (formData.get('currentState') ?? formData.get('mevcut')) === 'true';

  if (!id) return;

  await sql`UPDATE projeler SET one_cikan = ${!currentState} WHERE id = ${id}`;

  revalidateProjectPaths();
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  if (!id) return;

  await sql`DELETE FROM projeler WHERE id = ${id}`;

  revalidateProjectPaths();
}
