import { Project, ProjectCategory } from '@/types/portfolio';
import { ProjectRecord } from '@/types/admin';
import { FEATURED_PROJECTS } from '@/lib/data';

export interface DbProjectRow {
  id: number;
  slug: string | null;
  baslik: string;
  kategori: string;
  github_url: string | null;
  canli_url: string | null;
  teknolojiler: string | null;
  aciklama: string;
  detay: string | null;
  one_cikan: boolean;
  sira: number;
  yayinda: boolean;
  olusturma: string;
}

const VALID_CATEGORIES: ProjectCategory[] = ['backend', 'datascience', 'fullstack', 'mobile'];

function normalizeCategory(raw: string | null | undefined): ProjectCategory {
  if (raw && VALID_CATEGORIES.includes(raw as ProjectCategory)) {
    return raw as ProjectCategory;
  }
  return 'backend';
}

/**
 * Maps a raw PostgreSQL `projeler` row into the admin `ProjectRecord` domain model.
 */
export function mapRowToProjectRecord(row: DbProjectRow): ProjectRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.baslik,
    category: normalizeCategory(row.kategori),
    githubUrl: row.github_url,
    liveUrl: row.canli_url,
    technologies: row.teknolojiler,
    summary: row.aciklama,
    details: row.detay,
    isFeatured: Boolean(row.one_cikan),
    sortOrder: Number(row.sira) || 0,
    isPublished: Boolean(row.yayinda),
    createdAt: row.olusturma,
  };
}

/**
 * Maps a raw PostgreSQL `projeler` row into a localized public `Project` domain object.
 */
export function mapRowToProject(row: DbProjectRow): Project {
  const staticProj = FEATURED_PROJECTS.find(
    (p) =>
      p.slug === row.slug ||
      p.id === row.slug ||
      p.title.toLowerCase() === row.baslik.toLowerCase()
  );

  const techArray = row.teknolojiler
    ? row.teknolojiler
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : staticProj
    ? staticProj.technologies
    : [];

  const category = normalizeCategory(row.kategori);

  if (staticProj) {
    return {
      ...staticProj,
      id: String(row.id),
      slug: row.slug || staticProj.slug,
      title: row.baslik || staticProj.title,
      category,
      githubUrl: row.github_url || staticProj.githubUrl,
      liveUrl: row.canli_url || undefined,
      technologies: techArray.length > 0 ? techArray : staticProj.technologies,
      tagline: {
        ...staticProj.tagline,
        tr: row.aciklama || staticProj.tagline.tr,
        en:
          row.aciklama && row.aciklama !== staticProj.tagline.tr
            ? row.aciklama
            : staticProj.tagline.en,
        de:
          row.aciklama && row.aciklama !== staticProj.tagline.tr
            ? row.aciklama
            : staticProj.tagline.de,
        ru:
          row.aciklama && row.aciklama !== staticProj.tagline.tr
            ? row.aciklama
            : staticProj.tagline.ru,
      },
      overview: {
        ...staticProj.overview,
        tr: row.detay || row.aciklama || staticProj.overview.tr,
        en:
          row.detay && row.detay !== staticProj.overview.tr
            ? row.detay
            : staticProj.overview.en,
        de:
          row.detay && row.detay !== staticProj.overview.tr
            ? row.detay
            : staticProj.overview.de,
        ru:
          row.detay && row.detay !== staticProj.overview.tr
            ? row.detay
            : staticProj.overview.ru,
      },
    };
  }

  // Construct a complete localized Project object for custom admin-created entries
  const desc = row.aciklama || '';
  const details = row.detay || row.aciklama || '';

  const categoryLabel = {
    tr:
      category === 'datascience'
        ? 'Veri Bilimi'
        : category === 'fullstack'
        ? 'Full Stack Mimari'
        : category === 'mobile'
        ? 'Mobil & Sistem'
        : 'Backend Mimarisi',
    en:
      category === 'datascience'
        ? 'Data Science'
        : category === 'fullstack'
        ? 'Full Stack Architecture'
        : category === 'mobile'
        ? 'Mobile & Systems'
        : 'Backend Architecture',
    de:
      category === 'datascience'
        ? 'Data Science'
        : category === 'fullstack'
        ? 'Full-Stack-Architektur'
        : category === 'mobile'
        ? 'Mobile & Systeme'
        : 'Backend-Architektur',
    ru:
      category === 'datascience'
        ? 'Наука о данных'
        : category === 'fullstack'
        ? 'Full-Stack архитектура'
        : category === 'mobile'
        ? 'Мобильные и системные'
        : 'Бэкенд-архитектура',
  };

  return {
    id: String(row.id),
    slug: row.slug || `project-${row.id}`,
    title: row.baslik,
    category,
    githubUrl: row.github_url || '',
    liveUrl: row.canli_url || undefined,
    technologies: techArray,
    tagline: { tr: desc, en: desc, de: desc, ru: desc },
    overview: { tr: details, en: details, de: details, ru: details },
    highlights: {
      tr: [
        { label: 'Kategori', value: categoryLabel.tr },
        { label: 'Durum', value: row.yayinda ? 'Canlı / Aktif' : 'Geliştirme Aşamasında' },
        { label: 'Öne Çıkan', value: row.one_cikan ? 'Evet' : 'Hayır' },
        { label: 'Kayıt ID', value: `#${row.id}` },
      ],
      en: [
        { label: 'Category', value: categoryLabel.en },
        { label: 'Status', value: row.yayinda ? 'Live / Active' : 'In Development' },
        { label: 'Featured', value: row.one_cikan ? 'Yes' : 'No' },
        { label: 'Record ID', value: `#${row.id}` },
      ],
      de: [
        { label: 'Kategorie', value: categoryLabel.de },
        { label: 'Status', value: row.yayinda ? 'Aktiv' : 'In Entwicklung' },
        { label: 'Hervorgehoben', value: row.one_cikan ? 'Ja' : 'Nein' },
        { label: 'Datensatz-ID', value: `#${row.id}` },
      ],
      ru: [
        { label: 'Категория', value: categoryLabel.ru },
        { label: 'Статус', value: row.yayinda ? 'Активен' : 'В разработке' },
        { label: 'В избранном', value: row.one_cikan ? 'Да' : 'Нет' },
        { label: 'ID записи', value: `#${row.id}` },
      ],
    },
    keyConcepts: {
      tr: ['Nesne Yönelimli Mimari', category, ...techArray.slice(0, 3)],
      en: ['Object-Oriented Architecture', category, ...techArray.slice(0, 3)],
      de: ['Objektorientierte Architektur', category, ...techArray.slice(0, 3)],
      ru: ['Объектно-ориентированная архитектура', category, ...techArray.slice(0, 3)],
    },
    architecture: {
      tr: [
        { layer: 'Temel Katman', role: 'Genel Bakış', details: desc },
        { layer: 'Uygulama & Mantık', role: 'İş Akışı', details: details },
      ],
      en: [
        { layer: 'Core Layer', role: 'Overview', details: desc },
        { layer: 'Application & Logic', role: 'Workflow', details: details },
      ],
      de: [
        { layer: 'Kernschicht', role: 'Überblick', details: desc },
        { layer: 'Anwendung & Logik', role: 'Workflow', details: details },
      ],
      ru: [
        { layer: 'Базовый слой', role: 'Обзор', details: desc },
        { layer: 'Приложение и логика', role: 'Рабочий процесс', details: details },
      ],
    },
    engineeringInsights: {
      tr: [desc, `Kullanılan temel teknolojiler: ${techArray.join(', ')}`],
      en: [desc, `Primary technologies applied: ${techArray.join(', ')}`],
      de: [desc, `Verwendete Kerntechnologien: ${techArray.join(', ')}`],
      ru: [desc, `Основные используемые технологии: ${techArray.join(', ')}`],
    },
    futureRoadmap: {
      tr: ['Sürekli entegrasyon ve optimizasyon çalışmaları.', 'Ek modül geliştirmeleri.'],
      en: ['Continuous integration and performance tuning.', 'Feature expansions.'],
      de: ['Kontinuierliche Integration und Optimierung.', 'Funktionserweiterungen.'],
      ru: ['Непрерывная интеграция и оптимизация.', 'Расширение функциональности.'],
    },
  };
}
