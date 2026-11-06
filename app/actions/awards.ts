'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { AwardCategory, AwardRecord } from '@/types/portfolio';

interface RawAwardRow {
  id: number;
  ad: string;
  veren_kurum: string | null;
  tarih: string | Date | null;
  derece: number | null;
  aciklama: string | null;
  kategori_id: number | null;
  kategori_adi?: string | null;
  yayinda: boolean;
  olusturma?: string | Date;
}

interface RawAwardCategoryRow {
  id: number;
  ad: string;
}

function mapRowToAward(row: RawAwardRow): AwardRecord {
  const formattedDate = row.tarih
    ? typeof row.tarih === 'string'
      ? row.tarih
      : new Date(row.tarih).toISOString()
    : null;

  return {
    id: Number(row.id),
    title: row.ad,
    organization: row.veren_kurum ?? null,
    date: formattedDate,
    rank: row.derece !== null && row.derece !== undefined ? Number(row.derece) : null,
    description: row.aciklama ?? null,
    categoryId:
      row.kategori_id !== null && row.kategori_id !== undefined
        ? Number(row.kategori_id)
        : null,
    categoryName: row.kategori_adi ?? null,
    isPublished: Boolean(row.yayinda),
    createdAt: row.olusturma ? String(row.olusturma) : undefined,
  };
}

function mapRowToCategory(row: RawAwardCategoryRow): AwardCategory {
  return {
    id: Number(row.id),
    name: row.ad,
  };
}

/**
 * Fetches published awards from PostgreSQL ordered by date descending.
 */
export async function getPublishedAwards(limit?: number): Promise<AwardRecord[]> {
  try {
    const rows = limit
      ? ((await sql`
          SELECT o.*, ot.ad AS kategori_adi
          FROM oduller o
          LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
          WHERE o.yayinda = true
          ORDER BY o.tarih DESC NULLS LAST, o.id DESC
          LIMIT ${limit}
        `) as unknown as RawAwardRow[])
      : ((await sql`
          SELECT o.*, ot.ad AS kategori_adi
          FROM oduller o
          LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
          WHERE o.yayinda = true
          ORDER BY o.tarih DESC NULLS LAST, o.id DESC
        `) as unknown as RawAwardRow[]);

    return rows.map(mapRowToAward);
  } catch (err) {
    console.error('Database query error in getPublishedAwards:', err);
    return [];
  }
}

/**
 * Fetches all awards, categories, and optional editing target for the Admin Panel.
 */
export async function getAdminAwardsData(editId: number | null): Promise<{
  awards: AwardRecord[];
  categories: AwardCategory[];
  editingAward: AwardRecord | null;
}> {
  try {
    const [awardRows, categoryRows] = await Promise.all([
      sql`
        SELECT o.*, ot.ad AS kategori_adi
        FROM oduller o
        LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
        ORDER BY o.tarih DESC NULLS LAST, o.id DESC
      `,
      sql`SELECT * FROM odul_turleri ORDER BY ad ASC`,
    ]);

    const awards = (awardRows as unknown as RawAwardRow[]).map(mapRowToAward);
    const categories = (categoryRows as unknown as RawAwardCategoryRow[]).map(
      mapRowToCategory
    );
    const editingAward =
      editId && !Number.isNaN(editId)
        ? (awards.find((a) => a.id === editId) ?? null)
        : null;

    return { awards, categories, editingAward };
  } catch (err) {
    console.error('Failed to load awards for admin panel:', err);
    return { awards: [], categories: [], editingAward: null };
  }
}

function revalidateAwardPaths() {
  revalidatePath('/admin/awards');
  revalidatePath('/admin');
  revalidatePath('/awards');
  revalidatePath('/');
}

export async function createAwardAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const title = (formData.get('title') || formData.get('ad'))?.toString().trim();
  const organization =
    (formData.get('organization') || formData.get('veren_kurum'))?.toString().trim() ||
    null;
  const date =
    (formData.get('date') || formData.get('tarih'))?.toString().trim() || null;
  const rankRaw = (formData.get('rank') || formData.get('derece'))?.toString().trim();
  const rank = rankRaw ? parseInt(rankRaw, 10) : null;
  const description =
    (formData.get('description') || formData.get('aciklama'))?.toString().trim() ||
    null;
  const categoryRaw = (
    formData.get('categoryId') || formData.get('kategori_id')
  )
    ?.toString()
    .trim();
  const categoryId = categoryRaw ? parseInt(categoryRaw, 10) : null;

  if (!title) return;

  await sql`
    INSERT INTO oduller (ad, veren_kurum, tarih, derece, aciklama, kategori_id, yayinda)
    VALUES (${title}, ${organization}, ${date}, ${rank}, ${description}, ${categoryId}, true)
  `;

  revalidateAwardPaths();
}

export async function updateAwardAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const title = (formData.get('title') || formData.get('ad'))?.toString().trim();
  const organization =
    (formData.get('organization') || formData.get('veren_kurum'))?.toString().trim() ||
    null;
  const date =
    (formData.get('date') || formData.get('tarih'))?.toString().trim() || null;
  const rankRaw = (formData.get('rank') || formData.get('derece'))?.toString().trim();
  const rank = rankRaw ? parseInt(rankRaw, 10) : null;
  const description =
    (formData.get('description') || formData.get('aciklama'))?.toString().trim() ||
    null;
  const categoryRaw = (
    formData.get('categoryId') || formData.get('kategori_id')
  )
    ?.toString()
    .trim();
  const categoryId = categoryRaw ? parseInt(categoryRaw, 10) : null;

  if (!id || !title) return;

  await sql`
    UPDATE oduller
    SET ad = ${title},
        veren_kurum = ${organization},
        tarih = ${date},
        derece = ${rank},
        aciklama = ${description},
        kategori_id = ${categoryId}
    WHERE id = ${id}
  `;

  revalidateAwardPaths();
  redirect('/admin/awards');
}

export async function toggleAwardPublishAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const currentState =
    (formData.get('currentState') ?? formData.get('mevcut')) === 'true';

  if (!id) return;

  await sql`UPDATE oduller SET yayinda = ${!currentState} WHERE id = ${id}`;

  revalidateAwardPaths();
}

export async function deleteAwardAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  if (!id) return;

  await sql`DELETE FROM oduller WHERE id = ${id}`;

  revalidateAwardPaths();
}
