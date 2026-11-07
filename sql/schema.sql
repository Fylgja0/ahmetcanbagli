-- ==========================================================
-- DATABASE SCHEMA DEFINITIONS (DDL)
-- PostgreSQL / Neon Serverless
-- ==========================================================

-- 1. Administrators Table
CREATE TABLE IF NOT EXISTS yoneticiler (
  id SERIAL PRIMARY KEY,
  eposta TEXT UNIQUE NOT NULL,
  sifre_hash TEXT NOT NULL,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Active Admin Sessions Table
CREATE TABLE IF NOT EXISTS oturumlar (
  token TEXT PRIMARY KEY,
  yonetici_id INT NOT NULL REFERENCES yoneticiler(id) ON DELETE CASCADE,
  bitis TIMESTAMPTZ NOT NULL,
  son_aktivite TIMESTAMPTZ NOT NULL DEFAULT now(),
  cihaz TEXT
);

-- 3. Site Settings Table
CREATE TABLE IF NOT EXISTS site_ayarlari (
  anahtar TEXT PRIMARY KEY,
  deger TEXT NOT NULL,
  guncellenme TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Projects Table
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
);

-- 5. Award Categories Table
CREATE TABLE IF NOT EXISTS odul_turleri (
  id SERIAL PRIMARY KEY,
  ad TEXT UNIQUE NOT NULL
);

-- 6. Awards & Honors Table
CREATE TABLE IF NOT EXISTS oduller (
  id SERIAL PRIMARY KEY,
  ad TEXT NOT NULL,
  veren_kurum TEXT,
  tarih DATE,
  derece INT,
  aciklama TEXT,
  kategori_id INT REFERENCES odul_turleri(id) ON DELETE SET NULL,
  yayinda BOOLEAN NOT NULL DEFAULT true,
  olusturma TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Contact Messages Table
CREATE TABLE IF NOT EXISTS iletisim_mesajlari (
  id SERIAL PRIMARY KEY,
  ad_soyad TEXT NOT NULL,
  eposta TEXT NOT NULL,
  mesaj TEXT NOT NULL,
  kvkk_onay BOOLEAN NOT NULL DEFAULT false,
  okundu BOOLEAN NOT NULL DEFAULT false,
  gonderim_zamani TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Data Anonymization Audit Log Table
CREATE TABLE IF NOT EXISTS imha_kayitlari (
  id SERIAL PRIMARY KEY,
  adet INT NOT NULL,
  zaman TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Login Rate Limiting Table (Brute-Force Protection)
CREATE TABLE IF NOT EXISTS giris_denemeleri (
  anahtar TEXT PRIMARY KEY,
  deneme_sayisi INT NOT NULL DEFAULT 1,
  ilk_deneme TIMESTAMPTZ NOT NULL DEFAULT now(),
  son_deneme TIMESTAMPTZ NOT NULL DEFAULT now(),
  kilit_bitis TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_giris_denemeleri_kilit_bitis
  ON giris_denemeleri (kilit_bitis);

CREATE INDEX IF NOT EXISTS idx_giris_denemeleri_son_deneme
  ON giris_denemeleri (son_deneme);
