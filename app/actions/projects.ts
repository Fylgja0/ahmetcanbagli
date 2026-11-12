'use server';

import { revalidatePath } from 'next/cache';
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
import {
  FeaturedProjectOption,
  MAX_FEATURED_PROJECTS,
  ProjectMutationResult,
  ProjectRecord,
} from '@/types/admin';

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

/**
 * Returns the currently Featured projects ordered identically to the homepage
 * (`ORDER BY sira ASC, id ASC`).
 */
async function getFeaturedProjectOptions(
  excludeId?: number
): Promise<FeaturedProjectOption[]> {
  const rows = (excludeId
    ? await sql`
        SELECT * FROM projeler
        WHERE one_cikan = true AND id <> ${excludeId}
        ORDER BY sira ASC, id ASC
      `
    : await sql`
        SELECT * FROM projeler
        WHERE one_cikan = true
        ORDER BY sira ASC, id ASC
      `) as unknown as DbProjectRow[];

  return rows.map((row) => {
    const record = mapRowToProjectRecord(row);
    return {
      id: record.id,
      title: record.title,
      category: record.category,
      summary: record.summary,
      technologies: record.technologies,
      sortOrder: record.sortOrder,
      isPublished: record.isPublished,
    };
  });
}

function revalidateProjectPaths() {
  revalidatePath('/admin/projects');
  revalidatePath('/admin');
  revalidatePath('/projects');
  revalidatePath('/');
}

export async function createProjectAction(
  formData: FormData
): Promise<ProjectMutationResult> {
  await requireAdmin();

  const title = (formData.get('title') || formData.get('baslik'))
    ?.toString()
    .trim();
  const category =
    (formData.get('category') || formData.get('kategori'))?.toString().trim() ||
    'backend';
  const githubUrl =
    (formData.get('githubUrl') || formData.get('github_url'))
      ?.toString()
      .trim() || null;
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
    (formData.get('details') || formData.get('detay'))?.toString().trim() ||
    null;
  const isFeatured =
    formData.get('isFeatured') === 'on' ||
    formData.get('isFeatured') === 'true' ||
    formData.get('one_cikan') === 'on' ||
    formData.get('one_cikan') === 'true';
  const sortOrder = parseInt(
    (formData.get('sortOrder') || formData.get('sira'))?.toString() || '0',
    10
  );
  const rawReplaceId = parseInt(
    formData.get('replaceFeaturedId')?.toString() || '0',
    10
  );
  const replaceFeaturedId =
    !Number.isNaN(rawReplaceId) && rawReplaceId > 0 ? rawReplaceId : null;

  if (!title || !summary) {
    return {
      status: 'error',
      message: 'Proje başlığı ve kısa özet alanları zorunludur.',
    };
  }

  const slug = generateSlug(title);

  try {
    if (!isFeatured) {
      await sql`
        INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
        VALUES (${slug}, ${title}, ${category}, ${githubUrl}, ${liveUrl}, ${technologies}, ${summary}, ${details}, false, ${sortOrder}, true)
      `;

      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Proje başarıyla oluşturuldu.',
      };
    }

    if (!replaceFeaturedId) {
      const insertedRows = (await sql`
        WITH lock_step AS (
          SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
        ),
        current_featured AS (
          SELECT id
          FROM projeler, lock_step
          WHERE one_cikan = true
          FOR UPDATE
        ),
        inserted AS (
          INSERT INTO projeler (
            slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda
          )
          SELECT
            ${slug}, ${title}, ${category}, ${githubUrl}, ${liveUrl}, ${technologies}, ${summary}, ${details}, true, ${sortOrder}, true
          WHERE (SELECT COUNT(*) FROM current_featured) < ${MAX_FEATURED_PROJECTS}
          RETURNING id
        )
        SELECT id FROM inserted
      `) as unknown as Array<{ id: number }>;

      if (insertedRows.length === 0) {
        const featuredProjects = await getFeaturedProjectOptions();
        return {
          status: 'limit_reached',
          featuredProjects,
          message:
            'Aynı anda en fazla 3 proje öne çıkarılabilir. Yeni projeyi öne çıkarmak için mevcut vitrin projelerinden birini seçin.',
        };
      }

      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Yeni proje öne çıkarılarak oluşturuldu.',
      };
    }

    const swapRows = (await sql`
      WITH lock_step AS (
        SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
      ),
      locked_featured AS (
        SELECT id
        FROM projeler, lock_step
        WHERE one_cikan = true
        FOR UPDATE
      ),
      unfeatured AS (
        UPDATE projeler
        SET one_cikan = false
        WHERE id = ${replaceFeaturedId}
          AND id IN (SELECT id FROM locked_featured)
          AND (SELECT COUNT(*) FROM locked_featured WHERE id <> ${replaceFeaturedId}) < ${MAX_FEATURED_PROJECTS}
        RETURNING id
      ),
      inserted AS (
        INSERT INTO projeler (
          slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda
        )
        SELECT
          ${slug}, ${title}, ${category}, ${githubUrl}, ${liveUrl}, ${technologies}, ${summary}, ${details}, true, ${sortOrder}, true
        WHERE EXISTS (SELECT 1 FROM unfeatured)
        RETURNING id
      )
      SELECT
        (SELECT id FROM unfeatured) AS replaced_id,
        (SELECT id FROM inserted) AS inserted_id
    `) as unknown as Array<{
      replaced_id: number | null;
      inserted_id: number | null;
    }>;

    const insertedId = swapRows[0]?.inserted_id;
    if (!insertedId) {
      const featuredProjects = await getFeaturedProjectOptions();
      return {
        status: 'limit_reached',
        featuredProjects,
        message:
          'Seçilen vitrin projesi artık güncel değil. Lütfen listeden tekrar seçim yapın.',
      };
    }

    revalidateProjectPaths();
    return {
      status: 'success',
      replacedProjectId: replaceFeaturedId,
      message:
        'Seçilen proje vitrinden kaldırıldı ve yeni proje öne çıkarılarak oluşturuldu.',
    };
  } catch (e) {
    console.error('createProjectAction error:', e);
    return {
      status: 'error',
      message: 'Proje oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}

export async function updateProjectAction(
  formData: FormData
): Promise<ProjectMutationResult> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const title = (formData.get('title') || formData.get('baslik'))
    ?.toString()
    .trim();
  const category =
    (formData.get('category') || formData.get('kategori'))?.toString().trim() ||
    'backend';
  const githubUrl =
    (formData.get('githubUrl') || formData.get('github_url'))
      ?.toString()
      .trim() || null;
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
    (formData.get('details') || formData.get('detay'))?.toString().trim() ||
    null;
  const isFeatured =
    formData.get('isFeatured') === 'on' ||
    formData.get('isFeatured') === 'true' ||
    formData.get('one_cikan') === 'on' ||
    formData.get('one_cikan') === 'true';
  const sortOrder = parseInt(
    (formData.get('sortOrder') || formData.get('sira'))?.toString() || '0',
    10
  );
  const rawReplaceId = parseInt(
    formData.get('replaceFeaturedId')?.toString() || '0',
    10
  );
  const replaceFeaturedId =
    !Number.isNaN(rawReplaceId) && rawReplaceId > 0 ? rawReplaceId : null;

  if (!id || !title || !summary) {
    return {
      status: 'error',
      message: 'Proje başlığı ve kısa özet alanları zorunludur.',
    };
  }

  if (replaceFeaturedId && replaceFeaturedId === id) {
    return {
      status: 'error',
      message: 'Güncellenen proje kendisiyle değiştirilemez.',
    };
  }

  try {
    if (!isFeatured) {
      await sql`
        UPDATE projeler
        SET baslik = ${title},
            kategori = ${category},
            github_url = ${githubUrl},
            canli_url = ${liveUrl},
            teknolojiler = ${technologies},
            aciklama = ${summary},
            detay = ${details},
            one_cikan = false,
            sira = ${sortOrder}
        WHERE id = ${id}
      `;

      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Proje başarıyla güncellendi.',
      };
    }

    if (!replaceFeaturedId) {
      const updatedRows = (await sql`
        WITH lock_step AS (
          SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
        ),
        other_featured AS (
          SELECT id
          FROM projeler, lock_step
          WHERE one_cikan = true AND id <> ${id}
          FOR UPDATE
        ),
        updated AS (
          UPDATE projeler
          SET baslik = ${title},
              kategori = ${category},
              github_url = ${githubUrl},
              canli_url = ${liveUrl},
              teknolojiler = ${technologies},
              aciklama = ${summary},
              detay = ${details},
              one_cikan = true,
              sira = ${sortOrder}
          WHERE id = ${id}
            AND (SELECT COUNT(*) FROM other_featured) < ${MAX_FEATURED_PROJECTS}
          RETURNING id
        )
        SELECT id FROM updated
      `) as unknown as Array<{ id: number }>;

      if (updatedRows.length === 0) {
        const featuredProjects = await getFeaturedProjectOptions(id);
        return {
          status: 'limit_reached',
          featuredProjects,
          message:
            'Aynı anda en fazla 3 proje öne çıkarılabilir. Bu projeyi öne çıkarmak için mevcut vitrin projelerinden birini seçin.',
        };
      }

      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Proje başarıyla güncellendi.',
      };
    }

    const swapRows = (await sql`
      WITH lock_step AS (
        SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
      ),
      target_project AS (
        SELECT id
        FROM projeler, lock_step
        WHERE id = ${id}
        FOR UPDATE
      ),
      other_featured AS (
        SELECT id
        FROM projeler, lock_step
        WHERE one_cikan = true AND id <> ${id}
        FOR UPDATE
      ),
      unfeatured AS (
        UPDATE projeler
        SET one_cikan = false
        WHERE id = ${replaceFeaturedId}
          AND EXISTS (SELECT 1 FROM target_project)
          AND id IN (SELECT id FROM other_featured)
          AND (SELECT COUNT(*) FROM other_featured WHERE id <> ${replaceFeaturedId}) < ${MAX_FEATURED_PROJECTS}
        RETURNING id
      ),
      updated AS (
        UPDATE projeler
        SET baslik = ${title},
            kategori = ${category},
            github_url = ${githubUrl},
            canli_url = ${liveUrl},
            teknolojiler = ${technologies},
            aciklama = ${summary},
            detay = ${details},
            one_cikan = true,
            sira = ${sortOrder}
        WHERE id = ${id}
          AND EXISTS (SELECT 1 FROM unfeatured)
        RETURNING id
      )
      SELECT
        (SELECT id FROM unfeatured) AS replaced_id,
        (SELECT id FROM updated) AS updated_id
    `) as unknown as Array<{
      replaced_id: number | null;
      updated_id: number | null;
    }>;

    const updatedId = swapRows[0]?.updated_id;
    if (!updatedId) {
      const featuredProjects = await getFeaturedProjectOptions(id);
      return {
        status: 'limit_reached',
        featuredProjects,
        message:
          'Seçilen vitrin projesi artık güncel değil. Lütfen listeden tekrar seçim yapın.',
      };
    }

    revalidateProjectPaths();
    return {
      status: 'success',
      replacedProjectId: replaceFeaturedId,
      message:
        'Seçilen proje vitrinden kaldırıldı ve düzenlenen proje öne çıkarılarak güncellendi.',
    };
  } catch (e) {
    console.error('updateProjectAction error:', e);
    return {
      status: 'error',
      message: 'Proje güncellenirken bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}

export async function toggleProjectPublishAction(
  formData: FormData
): Promise<void> {
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
): Promise<ProjectMutationResult> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  const currentState =
    (formData.get('currentState') ?? formData.get('mevcut')) === 'true';
  const rawReplaceId = parseInt(
    formData.get('replaceFeaturedId')?.toString() || '0',
    10
  );
  const replaceFeaturedId =
    !Number.isNaN(rawReplaceId) && rawReplaceId > 0 ? rawReplaceId : null;

  if (!id) {
    return {
      status: 'error',
      message: 'Geçersiz proje kimliği.',
    };
  }

  try {
    if (currentState) {
      await sql`UPDATE projeler SET one_cikan = false WHERE id = ${id}`;
      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Proje öne çıkanlardan kaldırıldı.',
      };
    }

    if (!replaceFeaturedId) {
      const updatedRows = (await sql`
        WITH lock_step AS (
          SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
        ),
        other_featured AS (
          SELECT id
          FROM projeler, lock_step
          WHERE one_cikan = true AND id <> ${id}
          FOR UPDATE
        ),
        updated AS (
          UPDATE projeler
          SET one_cikan = true
          WHERE id = ${id}
            AND (SELECT COUNT(*) FROM other_featured) < ${MAX_FEATURED_PROJECTS}
          RETURNING id
        )
        SELECT id FROM updated
      `) as unknown as Array<{ id: number }>;

      if (updatedRows.length === 0) {
        const featuredProjects = await getFeaturedProjectOptions(id);
        return {
          status: 'limit_reached',
          featuredProjects,
          message:
            'Aynı anda en fazla 3 proje öne çıkarılabilir. Bu projeyi öne çıkarmak için mevcut vitrin projelerinden birini seçin.',
        };
      }

      revalidateProjectPaths();
      return {
        status: 'success',
        message: 'Proje öne çıkanlara eklendi.',
      };
    }

    if (replaceFeaturedId === id) {
      return {
        status: 'error',
        message: 'Proje kendisiyle değiştirilemez.',
      };
    }

    const swapRows = (await sql`
      WITH lock_step AS (
        SELECT pg_advisory_xact_lock(hashtext('projeler_featured_limit'))
      ),
      target_project AS (
        SELECT id
        FROM projeler, lock_step
        WHERE id = ${id}
        FOR UPDATE
      ),
      other_featured AS (
        SELECT id
        FROM projeler, lock_step
        WHERE one_cikan = true AND id <> ${id}
        FOR UPDATE
      ),
      unfeatured AS (
        UPDATE projeler
        SET one_cikan = false
        WHERE id = ${replaceFeaturedId}
          AND EXISTS (SELECT 1 FROM target_project)
          AND id IN (SELECT id FROM other_featured)
          AND (SELECT COUNT(*) FROM other_featured WHERE id <> ${replaceFeaturedId}) < ${MAX_FEATURED_PROJECTS}
        RETURNING id
      ),
      updated AS (
        UPDATE projeler
        SET one_cikan = true
        WHERE id = ${id}
          AND EXISTS (SELECT 1 FROM unfeatured)
        RETURNING id
      )
      SELECT
        (SELECT id FROM unfeatured) AS replaced_id,
        (SELECT id FROM updated) AS updated_id
    `) as unknown as Array<{
      replaced_id: number | null;
      updated_id: number | null;
    }>;

    const updatedId = swapRows[0]?.updated_id;
    if (!updatedId) {
      const featuredProjects = await getFeaturedProjectOptions(id);
      return {
        status: 'limit_reached',
        featuredProjects,
        message:
          'Seçilen vitrin projesi artık güncel değil. Lütfen listeden tekrar seçim yapın.',
      };
    }

    revalidateProjectPaths();
    return {
      status: 'success',
      replacedProjectId: replaceFeaturedId,
      message:
        'Seçilen proje vitrinden kaldırıldı ve yeni proje öne çıkarıldı.',
    };
  } catch (e) {
    console.error('toggleProjectFeaturedAction error:', e);
    return {
      status: 'error',
      message:
        'Öne çıkarma durumu güncellenirken bir hata oluştu. Lütfen tekrar deneyin.',
    };
  }
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = parseInt(formData.get('id')?.toString() || '0', 10);
  if (!id) return;

  await sql`DELETE FROM projeler WHERE id = ${id}`;

  revalidateProjectPaths();
}
