import { sql } from '@/lib/db';

/**
 * Site ayarları tablosunun varlığını garanti eder.
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
    console.error('ensureSettingsTable hatası:', err);
  }
}

/**
 * Belirtilen anahtar için ayar değerini okur.
 */
export async function getSetting(key: string, defaultValue = ''): Promise<string> {
  try {
    await ensureSettingsTable();
    const rows = await sql`
      SELECT deger FROM site_ayarlari WHERE anahtar = ${key} LIMIT 1
    `;
    if (rows && rows.length > 0) {
      return (rows[0] as { deger: string }).deger;
    }
    return defaultValue;
  } catch (err) {
    console.error(`getSetting(${key}) hatası:`, err);
    return defaultValue;
  }
}

/**
 * Belirtilen anahtara ait değeri kaydeder / günceller.
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
 * Awards (Ödüller) sayfasının ana sitede görünür olup olmadığını döner.
 * Varsayılan: true (görünür)
 */
export async function getAwardsVisibility(): Promise<boolean> {
  const val = await getSetting('awards_gorunur', 'true');
  return val !== 'false';
}

/**
 * Awards (Ödüller) sayfasının ana sitedeki görünürlüğünü günceller.
 */
export async function setAwardsVisibility(visible: boolean): Promise<void> {
  await setSetting('awards_gorunur', visible ? 'true' : 'false');
}

