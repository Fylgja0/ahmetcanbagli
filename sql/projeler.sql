-- ==========================================================
-- ÖĞRENCİ BİLGİLERİ
-- Ad Soyad : Ahmetcan Bağlı
-- Numara   : 2516016010
-- Ders     : BVA 2205 Siber Güvenlik ve Bilişim Hukuku
-- Modül    : Portfolyo Projeler Tablosu ve Yönetim Sorguları (CRUD)
-- ==========================================================

-- 1. Projeler Tablosu Şeması (DDL)
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

-- 2. Portfolyo Başlangıç Projeleri Tohum Kayıtları (INSERT)
INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
VALUES 
(
  'car-management-system',
  'Car Management System',
  'backend',
  'https://github.com/Fylgja0/car-management-system',
  NULL,
  'C#, .NET 10, Entity Framework Core 10, SQL Server, Code First, DbContext, LINQ, OOP',
  'C#, .NET 10, Entity Framework Core 10 ve SQL Server Code-First ile geliştirilen araç yönetim ve veritabanı projesi.',
  'C# ve .NET 10 kullanılarak geliştirilen, araç hiyerarşisi ve nesne yönelimli programlama prensiplerini veritabanı operasyonlarıyla birleştiren bir yönetim projesi. Entity Framework Core 10 Code-First yaklaşımı ve DbContext ile SQL Server üzerinde ilişkisel veritabanı tabloları ve migrasyonları yapılandırılmıştır. LINQ ile veritabanı sorguları ve veri filtreleme işlemleri gerçekleştirilmektedir.',
  true,
  1,
  true
),
(
  'ecommerce-return-prediction',
  'E-Commerce Return Prediction & Sales Analytics',
  'datascience',
  'https://github.com/Fylgja0/ecommerce-return-prediction',
  NULL,
  'Python, Pandas, Scikit-learn, CatBoost, imbalanced-learn, SMOTE, NumPy, Microsoft Excel',
  'E-ticaret veri kümelerinde müşteri iade durumunu tahmin eden ve satış verilerini inceleyen akademik veri bilimi projesi.',
  'E-ticaret işlem ve sipariş verileri üzerinde ürün iadelerinin tahmin edilmesi ve satış dinamiklerinin incelenmesi amacıyla geliştirilmiş bir veri bilimi ve makine öğrenmesi çalışmasıdır. İşlem verileri Pandas ile temizlenmiş, keşifsel veri analizi (EDA) yapılmış ve sınıf dengesizliği imbalanced-learn kütüphanesindeki SMOTE yöntemiyle ele alınmıştır. Sınıflandırma algoritmaları (CatBoost ve Scikit-learn modelleri) eğitilerek model performansı değerlendirilmiştir.',
  true,
  2,
  true
),
(
  'turkiye-elektrik-donusumu',
  'Türkiye''nin Elektrik Dönüşümü',
  'datascience',
  'https://github.com/Fylgja0/turkiye-elektrik-donusumu',
  'https://turkiye-elektrik-donusumu.vercel.app/',
  'Python, Pandas, NumPy, Matplotlib, Jupyter Notebook, JavaScript, HTML5, CSS3, SVG, Scrollytelling, Ember Data, Vercel',
  'Ember 2000–2024 elektrik verileriyle Türkiye''nin enerji üretimini, kaynak bileşimini ve fosil yakıt payını inceleyen etkileşimli veri hikâyesi (scrollytelling).',
  'Ember''ın Avrupa yıllık elektrik verileri (Europe CSV) temel alınarak geliştirilen proje, Türkiye''nin 2000–2024 yılları arasındaki 25 yıllık elektrik dönüşümünü araştırmaktadır. Python ve Pandas ile veri yükleme, eksik ve tekrarlı kayıt denetimleri ile kaynak hiyerarşisi filtrelemeleri gerçekleştirilmiştir. Elde edilen bulgular; kaydırma adımlarına göre dinamik güncellenen SVG grafikleri, kullanıcı kontrollü etkileşimli filtreleme paneli ve modern scrollytelling mimarisi ile web üzerinde etkileşimli bir veri anlatısına dönüştürülmüştür.',
  true,
  3,
  true
)
ON CONFLICT DO NOTHING;

-- 3. Yayındaki Projeleri Listeleme (SELECT)
SELECT * FROM projeler 
WHERE yayinda = true 
ORDER BY one_cikan DESC, sira ASC, id ASC;

-- 4. Kategori Bazlı Proje İstatistiği (GROUP BY)
SELECT 
  kategori,
  COUNT(*) AS toplam_proje,
  COUNT(*) FILTER (WHERE one_cikan = true) AS one_cikan_sayisi
FROM projeler
GROUP BY kategori;

-- 5. Proje Güncelleme (UPDATE)
UPDATE projeler 
SET aciklama = 'Güncellenmiş proje açıklaması',
    one_cikan = true
WHERE id = 1;

-- 6. Proje Silme (DELETE)
-- Belirli bir test projesini silme örneği:
DELETE FROM projeler 
WHERE slug = 'test-projesi';
