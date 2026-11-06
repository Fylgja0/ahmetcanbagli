import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LanguageId } from '@/types/portfolio';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOCALE_MAP: Record<LanguageId, string> = {
  tr: 'tr-TR',
  en: 'en-US',
  de: 'de-DE',
  ru: 'ru-RU',
};

export function getLocaleFromLanguage(lang: LanguageId): string {
  return LOCALE_MAP[lang] || 'en-US';
}

/**
 * Formats a numeric rank into a localized ordinal string (e.g., 1st, 2nd, 3rd in English).
 */
export function formatOrdinalRank(
  rank: number,
  lang: LanguageId,
  includePlaceWord: boolean = false
): string {
  if (rank === 1) {
    switch (lang) {
      case 'tr':
        return includePlaceWord ? '🥇 1.lik' : '🥇 1.';
      case 'de':
        return includePlaceWord ? '🥇 1. Platz' : '🥇 1.';
      case 'ru':
        return includePlaceWord ? '🥇 1-е место' : '🥇 1-е';
      default:
        return includePlaceWord ? '🥇 1st Place' : '🥇 1st';
    }
  }

  switch (lang) {
    case 'tr':
      return includePlaceWord ? `${rank}. Derece` : `${rank}.`;
    case 'de':
      return includePlaceWord ? `${rank}. Platz` : `${rank}.`;
    case 'ru':
      return includePlaceWord ? `${rank}-е место` : `${rank}-е`;
    default: {
      const mod10 = rank % 10;
      const mod100 = rank % 100;
      let suffix = 'th';
      if (mod10 === 1 && mod100 !== 11) suffix = 'st';
      else if (mod10 === 2 && mod100 !== 12) suffix = 'nd';
      else if (mod10 === 3 && mod100 !== 13) suffix = 'rd';
      return includePlaceWord ? `${rank}${suffix} Place` : `${rank}${suffix}`;
    }
  }
}

/**
 * Generates a URL-safe slug from a given title, transliterating common Turkish characters.
 */
export function generateSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `project-${Date.now()}`
  );
}
