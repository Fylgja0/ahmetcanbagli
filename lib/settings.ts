import { cache } from 'react';
import { sql } from '@/lib/db';

/**
 * Ensures the site settings table exists in PostgreSQL.
 */
export async function ensureSettingsTable(): Promise<void> {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_ayarlari (
        anahtar TEXT PRIMARY KEY,
        deger TEXT NOT NULL,
        guncellenme TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `;
  } catch (err) {
    console.error('Failed to ensure site_ayarlari table:', err);
  }
}

/**
 * Reads a configuration value by key, falling back to defaultValue if absent or if the database is unreachable.
 */
export async function getSetting(key: string, defaultValue = ''): Promise<string> {
  try {
    const rows = await sql`
      SELECT deger FROM site_ayarlari WHERE anahtar = ${key} LIMIT 1
    `;
    if (rows && rows.length > 0) {
      return (rows[0] as { deger: string }).deger;
    }
    return defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Upserts a configuration key-value pair in the database.
 */
export async function setSetting(key: string, value: string): Promise<void> {
  await ensureSettingsTable();
  await sql`
    INSERT INTO site_ayarlari (anahtar, deger, guncellenme)
    VALUES (${key}, ${value}, now())
    ON CONFLICT (anahtar)
    DO UPDATE SET deger = EXCLUDED.deger, guncellenme = now()
  `;
}

/**
 * Returns whether the Awards section is publicly visible on the main site.
 * Deduplicated per server request via React cache().
 */
export const getAwardsVisibility = cache(async (): Promise<boolean> => {
  const val = await getSetting('awards_gorunur', 'true');
  return val !== 'false';
});

/**
 * Updates the public visibility state of the Awards section.
 */
export async function setAwardsVisibility(visible: boolean): Promise<void> {
  await setSetting('awards_gorunur', visible ? 'true' : 'false');
}
