-- ==========================================================
-- SİTE AYARLARI TABLOSU (AWARDS VE GENEL GÖRÜNÜRLÜK KONTROLÜ)
-- ==========================================================

-- 1. Site Ayarları Tablosu Şeması (DDL)
CREATE TABLE IF NOT EXISTS site_ayarlari (
  anahtar TEXT PRIMARY KEY,
  deger TEXT NOT NULL,
  guncellenme TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Varsayılan Ayarlar (Tohum Kayıtları)
-- awards_gorunur: 'true' (Görünür / Yayında) veya 'false' (Gizli)
INSERT INTO site_ayarlari (anahtar, deger, guncellenme)
VALUES ('awards_gorunur', 'true', now())
ON CONFLICT (anahtar) DO NOTHING;

-- 3. Ayar Okuma (SELECT)
SELECT deger FROM site_ayarlari WHERE anahtar = 'awards_gorunur';

-- 4. Ayar Güncelleme (UPSERT / UPDATE)
INSERT INTO site_ayarlari (anahtar, deger, guncellenme)
VALUES ('awards_gorunur', 'false', now())
ON CONFLICT (anahtar) 
DO UPDATE SET deger = EXCLUDED.deger, guncellenme = now();

