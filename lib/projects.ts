import { Project } from '@/types/portfolio';
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

// Veritabanı satırını standart Project nesnesine dönüştürme fonksiyonu
export function mapRowToProject(row: DbProjectRow): Project {
    const staticProj = FEATURED_PROJECTS.find(
        (p) => p.slug === row.slug || p.id === row.slug || p.title.toLowerCase() === row.baslik.toLowerCase()
    );

    const techArray = row.teknolojiler
        ? row.teknolojiler.split(',').map((s) => s.trim()).filter(Boolean)
        : staticProj
        ? staticProj.technologies
        : [];

    const category = (row.kategori === 'datascience' ? 'datascience' : 'backend') as 'backend' | 'datascience';

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
                en: row.aciklama && row.aciklama !== staticProj.tagline.tr ? row.aciklama : staticProj.tagline.en,
                de: row.aciklama && row.aciklama !== staticProj.tagline.tr ? row.aciklama : staticProj.tagline.de,
                ru: row.aciklama && row.aciklama !== staticProj.tagline.tr ? row.aciklama : staticProj.tagline.ru,
            },
            overview: {
                ...staticProj.overview,
                tr: row.detay || row.aciklama || staticProj.overview.tr,
                en: row.detay && row.detay !== staticProj.overview.tr ? row.detay : staticProj.overview.en,
                de: row.detay && row.detay !== staticProj.overview.tr ? row.detay : staticProj.overview.de,
                ru: row.detay && row.detay !== staticProj.overview.tr ? row.detay : staticProj.overview.ru,
            },
        };
    }

    // Yeni panelden eklenen proje için tam donanımlı Project nesnesi üret
    const desc = row.aciklama || '';
    const details = row.detay || row.aciklama || '';

    return {
        id: String(row.id),
        slug: row.slug || `proje-${row.id}`,
        title: row.baslik,
        category,
        githubUrl: row.github_url || '',
        liveUrl: row.canli_url || undefined,
        technologies: techArray,
        tagline: { tr: desc, en: desc, de: desc, ru: desc },
        overview: { tr: details, en: details, de: details, ru: details },
        highlights: {
            tr: [
                { label: 'Kategori', value: category === 'backend' ? 'Backend Mimarisi' : 'Veri Bilimi' },
                { label: 'Durum', value: row.yayinda ? 'Canlı / Aktif' : 'Geliştirme Aşamasında' },
                { label: 'Öne Çıkan', value: row.one_cikan ? 'Evet' : 'Hayır' },
                { label: 'Kayıt ID', value: `#${row.id}` },
            ],
            en: [
                { label: 'Category', value: category === 'backend' ? 'Backend Architecture' : 'Data Science' },
                { label: 'Status', value: row.yayinda ? 'Live / Active' : 'In Development' },
                { label: 'Featured', value: row.one_cikan ? 'Yes' : 'No' },
                { label: 'Record ID', value: `#${row.id}` },
            ],
            de: [
                { label: 'Kategorie', value: category === 'backend' ? 'Backend-Architektur' : 'Data Science' },
                { label: 'Status', value: row.yayinda ? 'Aktiv' : 'In Entwicklung' },
                { label: 'Hervorgehoben', value: row.one_cikan ? 'Ja' : 'Nein' },
                { label: 'Datensatz-ID', value: `#${row.id}` },
            ],
            ru: [
                { label: 'Категория', value: category === 'backend' ? 'Бэкенд-архитектура' : 'Наука о данных' },
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
