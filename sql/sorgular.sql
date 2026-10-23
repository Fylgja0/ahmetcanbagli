-- ==========================================================
-- ÖĞRENCİ BİLGİLERİ
-- Ad Soyad : Ahmetcan Bağlı
-- Numara   : 2516016010
-- Ders     : BVA 2205 Siber Güvenlik ve Bilişim Hukuku
-- ==========================================================

-- ==========================================================
-- GÖREV 3: SQL SORGULARI
-- ==========================================================

-- Görev 3.1: İlk üçe giren (derece <= 3) VE son 2 yılda alınmış ödülleri listeleyin.
SELECT * FROM oduller
WHERE derece <= 3 AND tarih >= now() - interval '2 years';

-- Görev 3.2: En yeni 4 ödülü listeleyin.
SELECT * FROM oduller
ORDER BY tarih DESC NULLS LAST
LIMIT 4;

-- Görev 3.3: Derece ortalamasını ve birincilik sayısını tek sorguda bulun.
SELECT 
  AVG(derece) AS derece_ortalamasi,
  COUNT(*) FILTER (WHERE derece = 1) AS birincilik_sayisi
FROM oduller;

-- Görev 3.4: Her ödül türü için kaç ödül olduğunu kategori adıyla birlikte listeleyin.
-- Hiç kaydı olmayan kategoriler de 0 ile görünsün (LEFT JOIN + GROUP BY + COUNT).
SELECT 
  ot.ad AS kategori_adi,
  COUNT(o.id) AS odul_sayisi
FROM odul_turleri ot
LEFT JOIN oduller o ON ot.id = o.kategori_id
GROUP BY ot.ad;

-- Görev 3.5: ad alanında numaranızın (2516016010) geçtiği kaydı ILIKE ile bulun.
SELECT * FROM oduller
WHERE ad ILIKE '%2516016010%';

-- Görev 3.6: Veren kurumu boş olan kayıtlara 'Belirtilmemiş' yazın.
UPDATE oduller
SET veren_kurum = 'Belirtilmemiş'
WHERE veren_kurum IS NULL;

-- Görev 3.7: Derecesi 10'dan büyük olan kayıtları silin.
DELETE FROM oduller
WHERE derece > 10;


-- ==========================================================
-- GÖREV 6: GÜVENLİK GÖREVİ SQL SORGUSU
-- ==========================================================

-- Görev 6.SQL: Süresi dolmuş veya 30 dakikadır işlem yapılmayan tüm oturumları silen sorgu
DELETE FROM oturumlar
WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes';


-- ==========================================================
-- GÖREV 7: HUKUK GÖREVİ SQL SORGUSU
-- ==========================================================

-- Görev 7.SQL: Anonimleştirilen kayıt sayısını WITH ... RETURNING kullanarak 
-- tek komutla imha_kayitlari tablosuna yazan sorgu
WITH anonimlestirilenler AS (
  UPDATE iletisim_mesajlari
  SET ad_soyad = 'Anonim',
      eposta = 'anonim@example.invalid',
      mesaj = '[anonimleştirildi]'
  WHERE gonderim_zamani < now() - interval '1 year'
  RETURNING id
)
INSERT INTO imha_kayitlari (adet, zaman)
SELECT COUNT(*), now() FROM anonimlestirilenler;