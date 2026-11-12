-- ==========================================================
-- ANALYTICAL, SECURITY & PRIVACY SQL QUERIES
-- ==========================================================

-- 1. List Published Projects Ordered by Featured Priority and Sort Order
SELECT * FROM projeler
WHERE yayinda = true
ORDER BY one_cikan DESC, sira ASC, id ASC;

-- 2. Project Statistics Grouped by Category
SELECT 
  kategori,
  COUNT(*) AS total_projects,
  COUNT(*) FILTER (WHERE one_cikan = true) AS featured_count
FROM projeler
GROUP BY kategori;

-- 3. Top-3 Ranked Awards from the Last 2 Years
SELECT * FROM oduller
WHERE derece <= 3 AND tarih >= now() - interval '2 years';

-- 4. Latest 4 Published Awards
SELECT o.*, ot.ad AS kategori_adi
FROM oduller o
LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
WHERE o.yayinda = true
ORDER BY o.tarih DESC NULLS LAST
LIMIT 4;

-- 5. Average Rank and Total First-Place Awards in a Single Query
SELECT 
  AVG(derece) AS average_rank,
  COUNT(*) FILTER (WHERE derece = 1) AS first_place_count
FROM oduller;

-- 6. Award Count per Category (Including Empty Categories via LEFT JOIN)
SELECT 
  ot.ad AS category_name,
  COUNT(o.id) AS award_count
FROM odul_turleri ot
LEFT JOIN oduller o ON ot.id = o.kategori_id
GROUP BY ot.ad;

-- 7. Security Maintenance: Purge Expired or Inactive (>30 min) Sessions
DELETE FROM oturumlar
WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes';

-- 8. Data Privacy Compliance (GDPR/KVKK): Atomic Anonymization of Messages Older Than 1 Year
WITH anonymized_rows AS (
  UPDATE iletisim_mesajlari
  SET ad_soyad = 'Anonymous',
      eposta = 'anonymous@example.invalid',
      mesaj = '[anonymized]'
  WHERE gonderim_zamani < now() - interval '1 year'
    AND ad_soyad NOT IN ('Anonymous', 'Anonim')
  RETURNING id
)
INSERT INTO imha_kayitlari (adet, zaman)
SELECT COUNT(*), now() FROM anonymized_rows;

-- 9. Security Maintenance: Purge Expired Login Rate-Limit Entries
DELETE FROM giris_denemeleri
WHERE (kilit_bitis IS NOT NULL AND kilit_bitis < now())
   OR son_deneme < now() - interval '15 minutes';

-- 10. Security Maintenance: Purge Expired Contact Form Rate-Limit Entries
DELETE FROM iletisim_limitleri
WHERE pencere_baslangic < now() - interval '10 minutes';
