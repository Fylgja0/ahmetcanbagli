-- ==========================================================
-- INITIAL SEED DATA (DML)
-- ==========================================================

-- 1. Default Site Settings
INSERT INTO site_ayarlari (anahtar, deger, guncellenme)
VALUES ('awards_gorunur', 'true', now())
ON CONFLICT (anahtar) DO NOTHING;

-- 2. Default Portfolio Projects
INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
VALUES 
(
  'car-management-system',
  'Car Management System',
  'backend',
  'https://github.com/Fylgja0/car-management-system',
  NULL,
  'C#, .NET 10, Entity Framework Core 10, SQL Server, Code First, DbContext, LINQ, OOP',
  'Car management and database project developed with C#, .NET 10, Entity Framework Core 10, and SQL Server Code First.',
  'A car management application built with C# and .NET 10, combining an object-oriented car class hierarchy with relational database operations. Utilizes Entity Framework Core 10 Code First and DbContext to configure SQL Server schema tables and migrations. Database querying and data filtering are handled through LINQ.',
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
  'Academic data science and machine learning project predicting product return status from e-commerce transaction data.',
  'An academic data science and machine learning project focused on predicting product return outcomes and analyzing sales patterns using e-commerce datasets. Transaction records were cleaned and explored using Pandas (EDA). The class imbalance in the return data was addressed using SMOTE from imbalanced-learn, and classification models (CatBoost and Scikit-learn estimators) were trained and evaluated.',
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
  'Interactive scrollytelling data story analyzing Turkey''s electricity generation, source mix, and fossil fuel share using Ember 2000–2024 energy data.',
  'Built upon Ember''s European Yearly Electricity Data (Europe CSV), this project investigates Turkey''s 25-year power transformation between 2000 and 2024. Data ingestion, anomaly validation, and hierarchical source aggregation were conducted using Python and Pandas in Jupyter Notebook. The findings were translated into an interactive web data story featuring scrollytelling with dynamic SVG visualizations and a user-driven exploration panel.',
  true,
  3,
  true
)
ON CONFLICT DO NOTHING;
