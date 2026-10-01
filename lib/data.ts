import {
  Project,
  SkillCategory,
  EducationItem,
  FocusItem,
  ThemeConfig,
  NavItem,
} from '@/types/portfolio';

export const PERSONAL_INFO = {
  name: 'Ahmetcan Bağlı',
  shortName: 'Ahmetcan',
  email: 'a.can.bagli@gmail.com',
  github: 'https://github.com/Fylgja0',
  linkedin: 'https://www.linkedin.com/in/ahmetcanbagli',
  canonicalUrl: 'https://ahmetcanbagli.dev/',
};

export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: 'matrix',
    name: {
      tr: 'Matrix Siber',
      en: 'Matrix Cyber',
      de: 'Matrix Cyber',
      ru: 'Matrix Кибер',
    },
    accentColor: '#00ff66',
    badge: '01_MTX',
    description: {
      tr: 'C#, Python ve SQL kod akışı, zümrüt siber yağmur ve terminal estetiği.',
      en: 'Live C#, Python & SQL code rain with emerald cyber phosphor stream.',
      de: 'Live-Stream von C#-, Python- und SQL-Code mit smaragdgrünem Matrix-Regen.',
      ru: 'Живой поток реального кода C#, Python и SQL в изумрудном кибер-стиле.',
    },
  },
  {
    id: 'quantum',
    name: {
      tr: 'Fütüristik Kuantum',
      en: 'Futuristic Quantum',
      de: 'Futuristisches Quanten',
      ru: 'Квантовый Футуризм',
    },
    accentColor: '#00e5ff',
    badge: '02_QTM',
    description: {
      tr: 'Elektrik camgöbeği, etkileşimli kuantum dalgaları ve holografik parçacık ağı.',
      en: 'Electric cyan quantum field with interactive pulse waves and holographic lattice.',
      de: 'Elektrisches Cyan mit interaktiven Quantenwellen und holografischem Partikelnetz.',
      ru: 'Электрический циан с интерактивными квантовыми волнами и голографической сетью.',
    },
  },
  {
    id: 'gothic',
    name: {
      tr: 'Karanlık Gotik Teknoloji',
      en: 'Dark Gothic Tech',
      de: 'Dark Gothic Tech',
      ru: 'Темный Готик Тек',
    },
    accentColor: '#ff2a5f',
    badge: '03_GTH',
    description: {
      tr: 'Koyu yakut közleri, siber-gotik runik parçacıklar ve obsidyen alev parıltısı.',
      en: 'Deep ruby embers, cyber-gothic tech runes, and dramatic obsidian glow.',
      de: 'Tiefrote Glut, kybernetisch-gotische Runen und atmosphärischer Obsidian-Schimmer.',
      ru: 'Багровые восходящие искры, кибер-готические руны и обсидиановое пламя.',
    },
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    label: {
      tr: 'Hakkımda',
      en: 'About',
      de: 'Über mich',
      ru: 'Обо мне',
    },
    href: '#about',
  },
  {
    label: {
      tr: 'Yetenekler',
      en: 'Skills',
      de: 'Kenntnisse',
      ru: 'Навыки',
    },
    href: '#skills',
  },
  {
    label: {
      tr: 'Projeler',
      en: 'Projects',
      de: 'Projekte',
      ru: 'Проекты',
    },
    href: '#projects',
  },
  {
    label: {
      tr: 'Eğitim',
      en: 'Education',
      de: 'Ausbildung',
      ru: 'Образование',
    },
    href: '#education',
  },
  {
    label: {
      tr: 'Odak Alanları',
      en: 'Current Focus',
      de: 'Fokus',
      ru: 'Фокус',
    },
    href: '#focus',
  },
  {
    label: {
      tr: 'İletişim',
      en: 'Contact',
      de: 'Kontakt',
      ru: 'Контакты',
    },
    href: '#contact',
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'car-management-system',
    slug: 'car-management-system',
    title: 'Car Management System',
    category: 'backend',
    githubUrl: 'https://github.com/Fylgja0/car-management-system',
    technologies: [
      'C#',
      '.NET 10',
      'Entity Framework Core 10',
      'SQL Server',
      'Code First',
      'DbContext',
      'LINQ',
      'OOP',
    ],
    tagline: {
      tr: 'C#, .NET 10, Entity Framework Core 10 ve SQL Server Code-First ile geliştirilen araç yönetim ve veritabanı projesi.',
      en: 'Car management and database project developed with C#, .NET 10, Entity Framework Core 10, and SQL Server Code First.',
      de: 'Fahrzeugverwaltungs- und Datenbankprojekt, entwickelt mit C#, .NET 10, Entity Framework Core 10 und SQL Server Code First.',
      ru: 'Проект по управлению автомобилями и работе с базами данных, разработанный на C#, .NET 10, Entity Framework Core 10 и SQL Server Code First.',
    },
    overview: {
      tr: 'C# ve .NET 10 kullanılarak geliştirilen, araç hiyerarşisi ve nesne yönelimli programlama prensiplerini veritabanı operasyonlarıyla birleştiren bir yönetim projesi. Entity Framework Core 10 Code-First yaklaşımı ve DbContext ile SQL Server üzerinde ilişkisel veritabanı tabloları ve migrasyonları yapılandırılmıştır. LINQ ile veritabanı sorguları ve veri filtreleme işlemleri gerçekleştirilmektedir.',
      en: 'A car management application built with C# and .NET 10, combining an object-oriented car class hierarchy with relational database operations. Utilizes Entity Framework Core 10 Code First and DbContext to configure SQL Server schema tables and migrations. Database querying and data filtering are handled through LINQ.',
      de: 'Eine Fahrzeugverwaltungsanwendung, entwickelt mit C# und .NET 10, die eine objektorientierte Fahrzeughierarchie mit relationalen Datenbankoperationen verbindet. Nutzt Entity Framework Core 10 Code First und DbContext zur Erstellung von SQL Server Tabellen und Migrationen. Datenabfragen werden über LINQ abgewickelt.',
      ru: 'Приложение для управления автотранспортом на C# и .NET 10, объединяющее объектно-ориентированную иерархию классов автомобилей с операциями в реляционной базе данных. Использует Entity Framework Core 10 Code First и DbContext для создания таблиц и миграций в SQL Server, а также запросы LINQ для фильтрации данных.',
    },
    highlights: {
      tr: [
        { label: 'Temel Platform', value: 'C# & .NET 10' },
        { label: 'ORM & Veritabanı', value: 'EF Core 10 & SQL Server' },
        { label: 'Veritabanı Yaklaşımı', value: 'Code First Migrations' },
        { label: 'Sorgulama', value: 'LINQ & DbContext' },
      ],
      en: [
        { label: 'Core Platform', value: 'C# & .NET 10' },
        { label: 'ORM & Database', value: 'EF Core 10 & SQL Server' },
        { label: 'Database Strategy', value: 'Code First Migrations' },
        { label: 'Querying', value: 'LINQ & DbContext' },
      ],
      de: [
        { label: 'Kernplattform', value: 'C# & .NET 10' },
        { label: 'ORM & Datenbank', value: 'EF Core 10 & SQL Server' },
        { label: 'Datenbankansatz', value: 'Code First Migrationen' },
        { label: 'Abfragen', value: 'LINQ & DbContext' },
      ],
      ru: [
        { label: 'Платформа', value: 'C# & .NET 10' },
        { label: 'ORM и база данных', value: 'EF Core 10 & SQL Server' },
        { label: 'Подход к БД', value: 'Code First миграции' },
        { label: 'Запросы', value: 'LINQ & DbContext' },
      ],
    },
    keyConcepts: {
      tr: [
        'Nesne Yönelimli Programlama (OOP) ve Araç Sınıf Hiyerarşisi',
        'Entity Framework Core 10 ile Code-First Veritabanı Geliştirme',
        'SQL Server Migrations ile Şema Yönetimi',
        'DbContext Üzerinden CRUD İşlemleri',
        'LINQ ile Tip Güvenli Veri Sorgulama',
        'Kalıtım (Inheritance) ve Polimorfizm Uygulamaları',
      ],
      en: [
        'Object-Oriented Programming (OOP) & Car Class Hierarchy',
        'Code-First Database Development with Entity Framework Core 10',
        'Schema Management via SQL Server Migrations',
        'CRUD Operations through DbContext',
        'Type-Safe Data Querying with LINQ',
        'Inheritance and Polymorphism Implementations',
      ],
      de: [
        'Objektorientierte Programmierung (OOP) & Fahrzeughierarchie',
        'Code-First Datenbankentwicklung mit Entity Framework Core 10',
        'Schemamanagement über SQL Server Migrationen',
        'CRUD-Operationen über DbContext',
        'Typsichere Datenabfragen mit LINQ',
        'Vererbung und Polymorphismus in der Praxis',
      ],
      ru: [
        'Объектно-ориентированное программирование (ООП) и иерархия классов автомобилей',
        'Разработка баз данных Code-First с Entity Framework Core 10',
        'Управление схемой через миграции SQL Server',
        'Операции CRUD через DbContext',
        'Строго типизированные запросы с использованием LINQ',
        'Практика наследования и полиморфизма',
      ],
    },
    architecture: {
      tr: [
        {
          layer: 'Mevcut Durum: Veritabanı & ORM',
          role: 'DbContext & Code First',
          details: 'SQL Server bağlantısı, EF Core 10 DbContext yapılandırması ve Code First migration dosyaları.',
        },
        {
          layer: 'Mevcut Durum: Varlıklar & Hiyerarşi',
          role: 'OOP Modelleri',
          details: 'Araç (Car) sınıf hiyerarşisi, miras alma ve nesne yönelimli özellikler.',
        },
        {
          layer: 'Mevcut Durum: Veri İşlemleri',
          role: 'LINQ & CRUD',
          details: 'Veritabanı kayıtlarının eklenmesi, güncellenmesi ve LINQ ile sorgulanması.',
        },
        {
          layer: 'Planlanan / Geliştirme Kapsamı',
          role: 'Gelecek Adımlar',
          details: 'Servis katmanı ayrımı ve ek ilişkisel varlıkların entegrasyonu.',
        },
      ],
      en: [
        {
          layer: 'Current: Database & ORM',
          role: 'DbContext & Code First',
          details: 'SQL Server connection, EF Core 10 DbContext configuration, and Code First migration tracking.',
        },
        {
          layer: 'Current: Entities & Hierarchy',
          role: 'OOP Models',
          details: 'Car class hierarchy, inheritance structures, and object-oriented properties.',
        },
        {
          layer: 'Current: Data Operations',
          role: 'LINQ & CRUD',
          details: 'Adding, updating records in the database, and querying via LINQ.',
        },
        {
          layer: 'Planned / Future Scope',
          role: 'Future Roadmap',
          details: 'Service abstraction separation and additional relational entity expansions.',
        },
      ],
      de: [
        {
          layer: 'Aktuell: Datenbank & ORM',
          role: 'DbContext & Code First',
          details: 'SQL Server Anbindung, EF Core 10 DbContext Konfiguration und Code-First-Migrationen.',
        },
        {
          layer: 'Aktuell: Entitäten & Hierarchie',
          role: 'OOP-Modelle',
          details: 'Fahrzeug-Klassenhierarchie, Vererbung und objektorientierte Eigenschaften.',
        },
        {
          layer: 'Aktuell: Datenoperationen',
          role: 'LINQ & CRUD',
          details: 'Speichern, Aktualisieren und Abfragen von Einträgen über LINQ.',
        },
        {
          layer: 'Geplant / Zukünftiger Umfang',
          role: 'Ausblick',
          details: 'Dienstschicht-Entkopplung und Erweiterung um zusätzliche relationale Entitäten.',
        },
      ],
      ru: [
        {
          layer: 'Текущий статус: БД и ORM',
          role: 'DbContext и Code First',
          details: 'Подключение к SQL Server, настройка DbContext в EF Core 10 и миграции Code First.',
        },
        {
          layer: 'Текущий статус: Сущности',
          role: 'ООП-модели',
          details: 'Иерархия классов автомобилей, наследование и ООП-структура.',
        },
        {
          layer: 'Текущий статус: Операции с данными',
          role: 'LINQ и CRUD',
          details: 'Добавление, обновление записей в базе данных и выборка через LINQ.',
        },
        {
          layer: 'Запланировано / В разработке',
          role: 'Планы развития',
          details: 'Выделение сервисного слоя и добавление дополнительных связанных сущностей.',
        },
      ],
    },
    engineeringInsights: {
      tr: [
        'Entity Framework Core 10 ve .NET 10 ile Code-First yaklaşımı benimsenerek veritabanı şeması doğrudan C# sınıfları üzerinden üretildi.',
        'SQL Server migrasyonları ile şema değişiklikleri versiyonlanabilir hale getirildi.',
        'Araç hiyerarşisinde nesne yönelimli kalıtım prensipleri uygulanarak kod tekrarı azaltıldı.',
        'Veritabanı işlemleri DbContext üzerinden LINQ ifadeleriyle tip güvenli şekilde yürütüldü.',
      ],
      en: [
        'Adopted Entity Framework Core 10 with .NET 10 Code First to generate database schemas directly from C# classes.',
        'Managed schema iterations with SQL Server database migrations.',
        'Applied object-oriented inheritance within the Car hierarchy to reduce duplicate code.',
        'Executed database operations in a type-safe manner via DbContext and LINQ.',
      ],
      de: [
        'Verwendung von Entity Framework Core 10 und .NET 10 im Code-First-Verfahren zur Generierung von Datenbankschemata aus C#-Klassen.',
        'Verwaltung von Schema-Updates über SQL Server Datenbankmigrationen.',
        'Anwendung von Vererbung in der Fahrzeughierarchie zur Vermeidung redundanten Codes.',
        'Typsichere Durchführung von Datenbankoperationen über DbContext und LINQ.',
      ],
      ru: [
        'Применение Entity Framework Core 10 и .NET 10 с подходом Code First для генерации схем БД из классов C#.',
        'Версионирование изменений схемы с помощью миграций SQL Server.',
        'Использование объектно-ориентированного наследования в иерархии классов для устранения дублирования кода.',
        'Выполнение типизированных операций с базой данных через DbContext и LINQ.',
      ],
    },
    futureRoadmap: {
      tr: [
        'Ek ilişkisel modellerin (marka, kategori, detay özellikleri) eklenmesi.',
        'İş mantığı ve veri erişim kodlarının servis katmanlarına ayrılması.',
        'Konsol arayüzünün genişletilmesi veya basit bir API arayüzünün araştırılması.',
      ],
      en: [
        'Adding further relational models (brands, categories, and vehicle specs).',
        'Structuring business logic and data access into separated service layers.',
        'Expanding interface options and exploring a basic API interface.',
      ],
      de: [
        'Hinzufügen weiterer relationaler Modelle (Marken, Kategorien, Fahrzeugdaten).',
        'Strukturierung von Geschäftslogik und Datenzugriff in getrennte Serviceschichten.',
        'Erweiterung der Benutzeroberfläche und Prüfung einer einfachen API-Schnittstelle.',
      ],
      ru: [
        'Добавление связанных моделей (бренды, категории, характеристики автомобилей).',
        'Разделение бизнес-логики и доступа к данным на отдельные слои.',
        'Расширение интерфейса и изучение реализации базового API.',
      ],
    },
  },
  {
    id: 'ecommerce-return-prediction',
    slug: 'ecommerce-return-prediction',
    title: 'E-Commerce Return Prediction & Sales Analytics',
    category: 'datascience',
    githubUrl: 'https://github.com/Fylgja0/ecommerce-return-prediction',
    technologies: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'CatBoost',
      'imbalanced-learn',
      'SMOTE',
      'NumPy',
      'Microsoft Excel',
    ],
    tagline: {
      tr: 'E-ticaret veri kümelerinde müşteri iade durumunu tahmin eden ve satış verilerini inceleyen akademik veri bilimi projesi.',
      en: 'Academic data science and machine learning project predicting product return status from e-commerce transaction data.',
      de: 'Akademisches Data-Science- und Machine-Learning-Projekt zur Vorhersage von Retouren anhand von E-Commerce-Daten.',
      ru: 'Учебный проект по анализу данных и машинному обучению для прогнозирования возвратов товаров на основе данных электронной коммерции.',
    },
    overview: {
      tr: 'E-ticaret işlem ve sipariş verileri üzerinde ürün iadelerinin tahmin edilmesi ve satış dinamiklerinin incelenmesi amacıyla geliştirilmiş bir veri bilimi ve makine öğrenmesi çalışmasıdır. İşlem verileri Pandas ile temizlenmiş, keşifsel veri analizi (EDA) yapılmış ve sınıf dengesizliği imbalanced-learn kütüphanesindeki SMOTE yöntemiyle ele alınmıştır. Sınıflandırma algoritmaları (CatBoost ve Scikit-learn modelleri) eğitilerek model performansı değerlendirilmiştir.',
      en: 'An academic data science and machine learning project focused on predicting product return outcomes and analyzing sales patterns using e-commerce datasets. Transaction records were cleaned and explored using Pandas (EDA). The class imbalance in the return data was addressed using SMOTE from imbalanced-learn, and classification models (CatBoost and Scikit-learn estimators) were trained and evaluated.',
      de: 'Ein akademisches Data-Science- und Machine-Learning-Projekt zur Vorhersage von Produktretouren und zur Untersuchung von Vertriebsmustern in E-Commerce-Datensätzen. Die Transaktionsdaten wurden mit Pandas bereinigt und mittels explorativer Datenanalyse (EDA) untersucht. Klassenungleichgewichte wurden mit SMOTE aus imbalanced-learn behandelt und Klassifikationsmodelle mit CatBoost und Scikit-learn trainiert.',
      ru: 'Учебный проект по машинному обучению и анализу данных, направленный на прогнозирование возвратов товаров и анализ продаж на датасетах электронной коммерции. Предобработка и очистка транзакционных записей выполнены в Pandas, проведен разведочный анализ данных (EDA), а дисбаланс классов сбалансирован с помощью SMOTE из imbalanced-learn с обучением моделей CatBoost и Scikit-learn.',
    },
    highlights: {
      tr: [
        { label: 'Proje Türü', value: 'Akademik / Proje Bazlı ML' },
        { label: 'Modelleme', value: 'CatBoost & Scikit-learn' },
        { label: 'Dengesizlik Çözümü', value: 'SMOTE (imbalanced-learn)' },
        { label: 'Veri Analizi', value: 'Pandas & Keşifsel Analiz (EDA)' },
      ],
      en: [
        { label: 'Project Type', value: 'Academic / Project-Based ML' },
        { label: 'Modeling', value: 'CatBoost & Scikit-learn' },
        { label: 'Imbalance Handling', value: 'SMOTE (imbalanced-learn)' },
        { label: 'Data Analysis', value: 'Pandas & Exploratory Analysis (EDA)' },
      ],
      de: [
        { label: 'Projekttyp', value: 'Akademisches / Projektbasiertes ML' },
        { label: 'Modellierung', value: 'CatBoost & Scikit-learn' },
        { label: 'Imbalance-Methode', value: 'SMOTE (imbalanced-learn)' },
        { label: 'Datenanalyse', value: 'Pandas & Explorative Analyse (EDA)' },
      ],
      ru: [
        { label: 'Тип проекта', value: 'Учебный / проектный ML' },
        { label: 'Моделирование', value: 'CatBoost & Scikit-learn' },
        { label: 'Дисбаланс классов', value: 'SMOTE (imbalanced-learn)' },
        { label: 'Анализ данных', value: 'Pandas & Разведочный анализ (EDA)' },
      ],
    },
    keyConcepts: {
      tr: [
        'Keşifsel Veri Analizi (EDA) ile Satış & İade Eğilimlerinin İncelenmesi',
        'Veri Önişleme: Eksik Veri Düzenleme ve Kategorik Veri Kodlama',
        'Dengesiz Veri Kümeleri: SMOTE (Synthetic Minority Over-sampling)',
        'Sınıflandırma Modelleri: CatBoost ve Karar Ağaçları',
        'Model Değerlendirme: F1-Skoru, Confusion Matrix ve Sınıflandırma Metrikleri',
        'Excel Ortamında Analiz Tabloları ve Çıktıların Raporlanması',
      ],
      en: [
        'Exploratory Data Analysis (EDA) examining sales patterns and return distributions',
        'Data Preprocessing: Handling missing values and categorical data encoding',
        'Imbalanced Datasets: SMOTE (Synthetic Minority Over-sampling)',
        'Classification Estimators: CatBoost and Decision Tree models',
        'Model Evaluation: F1-Score, Confusion Matrix, and Classification Metrics',
        'Spreadsheet reporting and metric analysis in Excel',
      ],
      de: [
        'Explorative Datenanalyse (EDA) zur Untersuchung von Verkaufs- und Retourenmustern',
        'Datenvorverarbeitung: Umgang mit fehlenden Werten und Kodierung kategorialer Daten',
        'Umgang mit unbalancierten Daten: SMOTE (Synthetic Minority Over-sampling)',
        'Klassifikationsmodelle: CatBoost und Entscheidungsbäume',
        'Modellevaluierung: F1-Score, Confusion Matrix und Klassifikationsmetriken',
        'Berichterstellung und Analyse in Tabellenkalkulationen (Excel)',
      ],
      ru: [
        'Разведочный анализ данных (EDA) структуры продаж и распределения возвратов',
        'Предобработка данных: заполнение пропусков и кодирование категорий',
        'Работа с несбалансированными данными: метод SMOTE',
        'Модели классификации: CatBoost и решающие деревья',
        'Оценка моделей: F1-мера, матрица ошибок (Confusion Matrix) и метрики классификации',
        'Формирование отчетов и анализ результатов в Excel',
      ],
    },
    architecture: {
      tr: [
        {
          layer: 'Veri Yükleme & Temizleme',
          role: 'Data Ingestion & Cleaning',
          details: 'İşlem verilerinin Pandas DataFrame formatında yüklenmesi, eksik değerlerin ve veri tiplerinin düzenlenmesi.',
        },
        {
          layer: 'Keşifsel Veri Analizi (EDA)',
          role: 'Exploratory Data Analysis',
          details: 'Satış dağılımlarının, iade oranlarının ve değişken ilişkilerinin grafiklerle incelenmesi.',
        },
        {
          layer: 'Özellik Hazırlığı & Dengeleme',
          role: 'Feature Prep & Resampling',
          details: 'Kategorik değişkenlerin kodlanması ve imbalanced-learn SMOTE ile veri setinin dengelenmesi.',
        },
        {
          layer: 'Model Eğitimi & Değerlendirme',
          role: 'Training & Evaluation',
          details: 'CatBoost ve Scikit-learn sınıflandırıcılarının eğitilmesi, doğrulama metriklerinin analizi.',
        },
      ],
      en: [
        {
          layer: 'Data Ingestion & Cleaning',
          role: 'Data Pipeline',
          details: 'Loading transactional datasets with Pandas, handling missing values, and formatting data types.',
        },
        {
          layer: 'Exploratory Data Analysis (EDA)',
          role: 'Analysis & Visualization',
          details: 'Examining sales distributions, return frequencies, and variable correlations.',
        },
        {
          layer: 'Feature Preparation & Resampling',
          role: 'Data Preparation',
          details: 'Encoding categorical variables and addressing class imbalance via SMOTE.',
        },
        {
          layer: 'Model Training & Evaluation',
          role: 'Machine Learning',
          details: 'Training CatBoost and Scikit-learn classifiers and analyzing validation metrics.',
        },
      ],
      de: [
        {
          layer: 'Datenaufnahme & Bereinigung',
          role: 'Datenpipeline',
          details: 'Laden von Transaktionsdaten mit Pandas, Umgang mit fehlenden Werten und Formatierung.',
        },
        {
          layer: 'Explorative Datenanalyse (EDA)',
          role: 'Analyse & Visualisierung',
          details: 'Untersuchung von Verkaufsverteilungen, Retourenmustern und Korrelationen.',
        },
        {
          layer: 'Feature-Vorbereitung & Resampling',
          role: 'Datenvorbereitung',
          details: 'Kodierung kategorialer Variablen und Ausgleich des Klassenungleichgewichts mittels SMOTE.',
        },
        {
          layer: 'Modelltraining & Evaluation',
          role: 'Machine Learning',
          details: 'Training von CatBoost- und Scikit-learn-Klassifikatoren und Analyse der Validierungsmetriken.',
        },
      ],
      ru: [
        {
          layer: 'Загрузка и очистка данных',
          role: 'Пайплайн данных',
          details: 'Загрузка транзакционных данных через Pandas, обработка пропусков и типов данных.',
        },
        {
          layer: 'Разведочный анализ (EDA)',
          role: 'Анализ и визуализация',
          details: 'Исследование распределения продаж, частоты возвратов и корреляций переменных.',
        },
        {
          layer: 'Подготовка признаков и балансировка',
          role: 'Подготовка данных',
          details: 'Кодирование категориальных признаков и устранение дисбаланса классов с помощью SMOTE.',
        },
        {
          layer: 'Обучение моделей и оценка',
          role: 'Машинное обучение',
          details: 'Обучение классификаторов CatBoost и Scikit-learn, расчет метрик валидации.',
        },
      ],
    },
    engineeringInsights: {
      tr: [
        'İade verilerindeki sınıf dengesizliğinin model eğitimini olumsuz etkilemesini önlemek için SMOTE tekniği uygulandı.',
        'Pandas ile işlem verileri temizlenip dönüştürülerek analize hazır hale getirildi.',
        'CatBoost algoritmasının kategorik veri işleme kabiliyeti incelendi.',
        'Sadece ham doğruluk (accuracy) yerine dengesiz veri kümelerinde daha anlamlı olan değerlendirme metrikleri gözlemlendi.',
      ],
      en: [
        'Applied the SMOTE technique to counter the negative impact of class imbalance in product return records.',
        'Cleaned and transformed transactional records using Pandas to prepare a coherent dataset for analysis.',
        'Utilized CatBoost for handling categorical variables in the classification pipeline.',
        'Monitored evaluation metrics suitable for imbalanced datasets rather than relying solely on raw accuracy.',
      ],
      de: [
        'Einsatz der SMOTE-Technik, um Verzerrungen durch unausgewogene Klassenverteilungen bei Retouren zu reduzieren.',
        'Bereinigung und Transformation der Transaktionsdaten mit Pandas zur Vorbereitung auf die Analyse.',
        'Nutzung von CatBoost zur effektiven Verarbeitung kategorialer Daten in der Pipeline.',
        'Beobachtung geeigneter Evaluierungsmetriken für unbalancierte Daten anstelle bloßer Gesamttrefferquote.',
      ],
      ru: [
        'Применение метода SMOTE для компенсации дисбаланса классов в данных о возвратах.',
        'Очистка и трансформация транзакционных данных в Pandas для подготовки аналитического датасета.',
        'Использование возможностей CatBoost для обработки категориальных признаков.',
        'Оценка качества с использованием метрик для несбалансированных выборок вместо простой точности.',
      ],
    },
    futureRoadmap: {
      tr: [
        'Farklı özellik mühendisliği (feature engineering) yaklaşımlarının denenmesi.',
        'Hiperparametre ayarlama süreçlerinin derinleştirilmesi.',
        'Model sonuçlarının görselleştirilmesi için basit bir arayüz veya notebook raporlama yapısının genişletilmesi.',
      ],
      en: [
        'Experimenting with additional feature engineering techniques.',
        'Expanding hyperparameter tuning experiments.',
        'Extending notebook reporting and result visualizations.',
      ],
      de: [
        'Erprobung weiterer Ansätze für das Feature Engineering.',
        'Vertiefung von Experimenten zum Hyperparameter-Tuning.',
        'Ausbau der Notebook-Berichte und Ergebnisvisualisierungen.',
      ],
      ru: [
        'Эксперименты с новыми методами генерации признаков (feature engineering).',
        'Углубленная настройка гиперпараметров моделей.',
        'Расширение отчетов в Jupyter Notebook и визуализации результатов.',
      ],
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    icon: 'Server',
    title: {
      tr: 'C# & .NET Geliştirme',
      en: 'C# & .NET Development',
      de: 'C# & .NET Entwicklung',
      ru: 'C# & .NET Разработка',
    },
    description: {
      tr: 'Nesne yönelimli programlama, Entity Framework Core 10 ile Code-First veritabanı operasyonları ve LINQ.',
      en: 'Object-oriented programming, Code-First database operations with Entity Framework Core 10, and LINQ.',
      de: 'Objektorientierte Programmierung, Code-First-Datenbankoperationen mit Entity Framework Core 10 und LINQ.',
      ru: 'Объектно-ориентированное программирование, операции с базами данных Code-First в Entity Framework Core 10 и LINQ.',
    },
    skills: [
      {
        name: {
          tr: 'C#',
          en: 'C#',
          de: 'C#',
          ru: 'C#',
        },
        context: {
          tr: 'Güçlü tip denetimi, sınıf yapıları, arayüzler ve modern C# dil özellikleri.',
          en: 'Strong typing, class structures, interfaces, and modern C# language features.',
          de: 'Strikte Typisierung, Klassenstrukturen, Schnittstellen und moderne C#-Features.',
          ru: 'Строгая типизация, структуры классов, интерфейсы и возможности современного C#.',
        },
        tags: ['C#', 'OOP', 'Strong Typing'],
      },
      {
        name: {
          tr: '.NET 10',
          en: '.NET 10',
          de: '.NET 10',
          ru: '.NET 10',
        },
        context: {
          tr: '.NET 10 ortamında konsol ve veritabanı uygulamaları geliştirme.',
          en: 'Building console and database-backed applications on .NET 10 runtime.',
          de: 'Entwicklung von Konsolen- und datenbankgestützten Anwendungen unter .NET 10.',
          ru: 'Разработка консольных и связанных с базой данных приложений на платформе .NET 10.',
        },
        tags: ['.NET 10', 'Runtime', 'Console Apps'],
      },
      {
        name: {
          tr: 'Entity Framework Core 10',
          en: 'Entity Framework Core 10',
          de: 'Entity Framework Core 10',
          ru: 'Entity Framework Core 10',
        },
        context: {
          tr: 'Code-First yaklaşımı, DbContext yapılandırması ve veritabanı göçleri (migrations).',
          en: 'Code-First database creation, DbContext mapping, and database migrations.',
          de: 'Code-First Modellierung, DbContext-Konfiguration und Datenbankmigrationen.',
          ru: 'Создание баз данных Code-First, настройка DbContext и миграции.',
        },
        tags: ['EF Core 10', 'Code First', 'DbContext', 'Migrations'],
      },
      {
        name: {
          tr: 'LINQ',
          en: 'LINQ',
          de: 'LINQ',
          ru: 'LINQ',
        },
        context: {
          tr: 'LINQ-to-Entities ile deklaratif, tip güvenli veri sorguları ve filtreleme.',
          en: 'Declarative, type-safe data transformations and database queries via LINQ.',
          de: 'Deklarative, typsichere Abfragen und Datenfilterung mit LINQ.',
          ru: 'Декларативные строго типизированные запросы и фильтрация данных через LINQ.',
        },
        tags: ['LINQ', 'Data Querying', 'Lambda'],
      },
      {
        name: {
          tr: 'Nesne Yönelimli Programlama (OOP)',
          en: 'Object-Oriented Programming (OOP)',
          de: 'Objektorientierte Programmierung (OOP)',
          ru: 'Объектно-ориентированное программирование (ООП)',
        },
        context: {
          tr: 'Kalıtım (inheritance), polimorfizm ve sınıf hiyerarşisi tasarımı.',
          en: 'Inheritance, polymorphism, and class hierarchy design in practical code.',
          de: 'Vererbung, Polymorphismus und Klassen-Hierarchiedesign in der Praxis.',
          ru: 'Наследование, полиморфизм и построение иерархий классов на практике.',
        },
        tags: ['OOP', 'Inheritance', 'Polymorphism'],
      },
    ],
  },
  {
    id: 'datascience',
    icon: 'Brain',
    title: {
      tr: 'Python & Veri Bilimi',
      en: 'Python & Data Science',
      de: 'Python & Data Science',
      ru: 'Python & Data Science',
    },
    description: {
      tr: 'Veri önişleme, keşifsel veri analizi (EDA), dengesiz veri setleri ve makine öğrenmesi modelleri.',
      en: 'Data preprocessing, exploratory data analysis (EDA), handling imbalanced datasets, and ML models.',
      de: 'Datenvorverarbeitung, explorative Datenanalyse (EDA), Imbalance-Handling und ML-Modelle.',
      ru: 'Предобработка данных, разведочный анализ (EDA), балансировка классов и модели машинного обучения.',
    },
    skills: [
      {
        name: {
          tr: 'Python',
          en: 'Python',
          de: 'Python',
          ru: 'Python',
        },
        context: {
          tr: 'Veri yapıları, analitik betikler, fonksiyonel ve modüler programlama.',
          en: 'Analytical scripting, modular structures, and data manipulation in Python.',
          de: 'Skripterstellung, modulare Strukturen und Datenmanipulation in Python.',
          ru: 'Аналитические скрипты, модульные структуры и обработка данных на Python.',
        },
        tags: ['Python', 'Scripting', 'Jupyter'],
      },
      {
        name: {
          tr: 'Pandas & NumPy',
          en: 'Pandas & NumPy',
          de: 'Pandas & NumPy',
          ru: 'Pandas & NumPy',
        },
        context: {
          tr: 'Tablolu verileri yükleme, temizleme, birleştirme (merge/join) ve agregasyon.',
          en: 'Loading tabular datasets, cleaning data, merges, joins, and aggregations.',
          de: 'Laden tabellarischer Datensätze, Datenbereinigung, Joins und Aggregationen.',
          ru: 'Загрузка табличных данных, очистка, объединение (merge/join) и агрегации.',
        },
        tags: ['Pandas', 'NumPy', 'Data Cleaning', 'EDA'],
      },
      {
        name: {
          tr: 'Scikit-learn & CatBoost',
          en: 'Scikit-learn & CatBoost',
          de: 'Scikit-learn & CatBoost',
          ru: 'Scikit-learn & CatBoost',
        },
        context: {
          tr: 'Sınıflandırma algoritmaları, model eğitimi, veri bölme ve doğrulama.',
          en: 'Supervised classification estimators, model training, and validation.',
          de: 'Klassifikationsalgorithmen, Modelltraining, Datensplits und Validierung.',
          ru: 'Алгоритмы классификации, обучение моделей, разбиение данных и валидация.',
        },
        tags: ['Scikit-learn', 'CatBoost', 'Classification'],
      },
      {
        name: {
          tr: 'Dengesiz Veri & Metrikler (SMOTE)',
          en: 'Imbalanced Data Handling (SMOTE)',
          de: 'Unbalancierte Daten (SMOTE)',
          ru: 'Несбалансированные данные (SMOTE)',
        },
        context: {
          tr: 'imbalanced-learn SMOTE ile sınıf dengeleme, F1-skoru ve sınıflandırma metrikleri değerlendirmesi.',
          en: 'Class resampling using SMOTE from imbalanced-learn, F1-score, and classification metrics evaluation.',
          de: 'Resampling mit SMOTE aus imbalanced-learn sowie Auswertung über F1-Score und Klassifikationsmetriken.',
          ru: 'Балансировка классов через SMOTE (imbalanced-learn), оценка по F1-мере и метрикам классификации.',
        },
        tags: ['imbalanced-learn', 'SMOTE', 'Evaluation Metrics'],
      },
    ],
  },
  {
    id: 'databases',
    icon: 'Database',
    title: {
      tr: 'Veritabanı & SQL',
      en: 'Databases & SQL',
      de: 'Datenbanken & SQL',
      ru: 'Базы данных & SQL',
    },
    description: {
      tr: 'İlişkisel veritabanı tasarımı, SQL Server ve temel sorgu yazımı.',
      en: 'Relational database schema modeling, SQL Server, and SQL querying.',
      de: 'Relationales Datenbankdesign, SQL Server und SQL-Abfragen.',
      ru: 'Проектирование реляционных схем, работа с SQL Server и написание запросов.',
    },
    skills: [
      {
        name: {
          tr: 'Microsoft SQL Server',
          en: 'Microsoft SQL Server',
          de: 'Microsoft SQL Server',
          ru: 'Microsoft SQL Server',
        },
        context: {
          tr: 'Tablolar, yabancı anahtar (FK) kısıtları ve SQL Server Management Studio (SSMS).',
          en: 'Relational tables, foreign key constraints, and administration with SSMS.',
          de: 'Tabellen, Fremdschlüssel und Administration mit SSMS.',
          ru: 'Таблицы, ограничения внешних ключей и администрирование в SSMS.',
        },
        tags: ['SQL Server', 'SSMS', 'Relational DB'],
      },
      {
        name: {
          tr: 'SQL & Sorgu Yazımı',
          en: 'SQL & Query Writing',
          de: 'SQL & Abfragen',
          ru: 'SQL и написание запросов',
        },
        context: {
          tr: 'JOIN sorguları, filtreleme, gruplama (GROUP BY) ve temel DDL / DML komutları.',
          en: 'Relational JOIN queries, filtering, aggregation (GROUP BY), and DDL / DML operations.',
          de: 'JOIN-Abfragen, Filterung, Aggregation (GROUP BY) und DDL / DML-Operationen.',
          ru: 'Запросы JOIN, фильтрация, группировка (GROUP BY) и команды DDL / DML.',
        },
        tags: ['SQL', 'JOINs', 'Aggregations', 'DDL / DML'],
      },
      {
        name: {
          tr: 'İlişkisel Veritabanı Tasarımı',
          en: 'Relational Database Design',
          de: 'Relationales Datenbankdesign',
          ru: 'Проектирование реляционных БД',
        },
        context: {
          tr: 'Tablo normalizasyonu temelleri, birincil ve yabancı anahtarlar, veri tutarlılığı.',
          en: 'Normalization fundamentals, primary and foreign key definitions, and referential integrity.',
          de: 'Grundlagen der Normalisierung, Primär- und Fremdschlüssel und Datenintegrität.',
          ru: 'Основы нормализации, первичные и внешние ключи и ссылочная целостность.',
        },
        tags: ['Schema Design', 'Normalization', 'Data Integrity'],
      },
    ],
  },
  {
    id: 'tools',
    icon: 'Wrench',
    title: {
      tr: 'Geliştirici Araçları',
      en: 'Developer Tools',
      de: 'Entwicklungswerkzeuge',
      ru: 'Инструменты разработки',
    },
    description: {
      tr: 'Sürüm kontrolü, geliştirme ortamları ve veri tabloları.',
      en: 'Version control, development environments, and spreadsheet data handling.',
      de: 'Versionskontrolle, Entwicklungsumgebungen und Tabellenkalkulation.',
      ru: 'Контроль версий, среды разработки и работа с таблицами.',
    },
    skills: [
      {
        name: {
          tr: 'Git & GitHub',
          en: 'Git & GitHub',
          de: 'Git & GitHub',
          ru: 'Git & GitHub',
        },
        context: {
          tr: 'Branch yönetimi, commit geçmişi ve açık kaynak proje paylaşımı.',
          en: 'Branch workflows, commit history hygiene, and open-source project tracking on GitHub.',
          de: 'Branch-Verwaltung, Commit-Historie und Open-Source-Verwaltung auf GitHub.',
          ru: 'Управление ветками, история коммитов и ведение открытых проектов на GitHub.',
        },
        tags: ['Git', 'GitHub', 'Version Control'],
      },
      {
        name: {
          tr: 'Visual Studio & VS Code',
          en: 'Visual Studio & VS Code',
          de: 'Visual Studio & VS Code',
          ru: 'Visual Studio & VS Code',
        },
        context: {
          tr: '.NET geliştirme, kod hata ayıklama (debugging) ve Python ortamları.',
          en: '.NET application development, debugging, and Python virtual environments.',
          de: '.NET-Entwicklung, Debugging und Python-Umgebungen.',
          ru: 'Разработка на .NET, отладка кода и окружения Python.',
        },
        tags: ['Visual Studio', 'VS Code', 'Debugging'],
      },
      {
        name: {
          tr: 'Veri İnceleme & E-Tablolar (Excel)',
          en: 'Data Inspection & Spreadsheets (Excel)',
          de: 'Datenprüfung & Tabellen (Excel)',
          ru: 'Анализ данных и таблицы (Excel)',
        },
        context: {
          tr: 'Microsoft Excel ile veri inceleme, filtreleme, tablolama ve özet analizler.',
          en: 'Data inspection, filtering, spreadsheet structures, and summary analysis with Microsoft Excel.',
          de: 'Datenprüfung, Filterung, Tabellenstrukturen und Übersichtsberechnungen mit Microsoft Excel.',
          ru: 'Анализ данных, фильтрация, табличные структуры и сводные расчеты в Microsoft Excel.',
        },
        tags: ['Excel', 'Spreadsheets', 'Data Inspection'],
      },
    ],
  },
];

export const EDUCATION_DATA: EducationItem = {
  id: 'mcbu-bda',
  institution: {
    tr: 'Manisa Celal Bayar Üniversitesi',
    en: 'Manisa Celal Bayar University',
    de: 'Manisa Celal Bayar Universität',
    ru: 'Университет Маниса Джелал Баяр',
  },
  department: {
    tr: 'Büyük Veri Analitiği',
    en: 'Big Data Analytics',
    de: 'Big Data Analytics',
    ru: 'Анализ больших данных',
  },
  location: {
    tr: 'Manisa, Türkiye',
    en: 'Manisa, Turkey',
    de: 'Manisa, Türkei',
    ru: 'Маниса, Турция',
  },
  period: {
    tr: '2025 — Günümüz',
    en: '2025 — Present',
    de: '2025 — Heute',
    ru: '2025 — настоящее время',
  },
  status: {
    tr: 'Aktif Öğrenci',
    en: 'Active Student',
    de: 'Aktiver Student',
    ru: 'Студент очного отделения',
  },
  description: {
    tr: 'Büyük veri temelleri, veritabanı yönetimi, veri analitiği yöntemleri ve programlama temelleri üzerine yoğunlaşan önlisans akademik eğitimi.',
    en: 'Associate degree academic program concentrating on big data fundamentals, database management, data analytics techniques, and programming foundations.',
    de: 'Akademisches Studium (Associate Degree) mit Schwerpunkt auf Big-Data-Grundlagen, Datenbankmanagement, Methoden der Datenanalytik und Programmierung.',
    ru: 'Программа высшего образования (Associate Degree), сфокусированная на основах больших данных, управлении базами данных, методах анализа данных и программировании.',
  },
  keyCoursework: {
    tr: [
      'Büyük Veri Analitiğine Giriş',
      'İlişkisel Veritabanı Sistemleri & SQL',
      'İstatistiksel Veri Analizi',
      'Nesne Yönelimli Programlama Temelleri',
      'Makine Öğrenmesi & Veri Madenciliği Temelleri',
      'Algoritmalar & Veri Yapıları',
    ],
    en: [
      'Introduction to Big Data Analytics',
      'Relational Database Systems & SQL',
      'Statistical Data Analysis',
      'Object-Oriented Programming Fundamentals',
      'Machine Learning & Data Mining Foundations',
      'Algorithms & Data Structures',
    ],
    de: [
      'Einführung in Big Data Analytics',
      'Relationale Datenbanksysteme & SQL',
      'Statistische Datenanalyse',
      'Grundlagen der objektorientierten Programmierung',
      'Grundlagen Machine Learning & Data Mining',
      'Algorithmen & Datenstrukturen',
    ],
    ru: [
      'Введение в анализ больших данных',
      'Реляционные базы данных и SQL',
      'Статистический анализ данных',
      'Основы объектно-ориентированного программирования',
      'Основы машинного обучения и Data Mining',
      'Алгоритмы и структуры данных',
    ],
  },
  practicalFocus: {
    tr: [
      'Veri kümeleri üzerinde eksik değer düzenleme ve temizleme uygulamaları.',
      'SQL Server ortamında ilişkisel tablolar oluşturma ve SQL sorguları yazma.',
      'Python kütüphaneleri (Pandas, Scikit-learn) ile temel makine öğrenmesi uygulamaları.',
      'Ders kapsamında öğrenilen konuları bağımsız C#/.NET ve Python projelerine dönüştürme.',
    ],
    en: [
      'Practical exercises on dataset cleaning, missing value handling, and structuring.',
      'Creating relational tables and writing queries in SQL Server.',
      'Applying basic machine learning workflows using Python libraries (Pandas, Scikit-learn).',
      'Reinforcing academic coursework through independent C#/.NET and Python coding projects.',
    ],
    de: [
      'Praktische Übungen zur Datenbereinigung und Behandlung fehlender Werte.',
      'Erstellung relationaler Tabellen und Formulierung von SQL-Abfragen in SQL Server.',
      'Anwendung von Machine-Learning-Workflows mit Python-Bibliotheken (Pandas, Scikit-learn).',
      'Vertiefung der Studieninhalte durch eigenständige C#/.NET- und Python-Projekte.',
    ],
    ru: [
      'Практические задания по очистке данных и обработке пропущенных значений.',
      'Создание реляционных таблиц и написание SQL-запросов в SQL Server.',
      'Освоение базовых процессов машинного обучения на Python (Pandas, Scikit-learn).',
      'Закрепление учебных тем в самостоятельных проектах на C#/.NET и Python.',
    ],
  },
};

export const CURRENT_FOCUS_ITEMS: FocusItem[] = [
  {
    id: 'focus-dotnet',
    topic: {
      tr: 'C# & .NET Veritabanı Uygulama Geliştirme',
      en: 'C# & .NET Database Application Development',
      de: 'C# & .NET Datenbankanwendungsentwicklung',
      ru: 'Разработка приложений баз данных на C# и .NET',
    },
    description: {
      tr: 'C# dilinin modern özelliklerini, Entity Framework Core 10 ile Code-First ilişkilerini ve veritabanı operasyonlarını pekiştiriyorum.',
      en: 'Consolidating knowledge of modern C# features, Entity Framework Core 10 Code-First relationships, and database-backed workflows.',
      de: 'Vertiefung moderner C#-Sprachfeatures, Code-First-Beziehungen in Entity Framework Core 10 und Datenbankoperationen.',
      ru: 'Углубление знаний возможностей современного C#, связей Code-First в Entity Framework Core 10 и работы с БД.',
    },
    technologies: ['C#', '.NET 10', 'Entity Framework Core 10', 'SQL Server', 'LINQ'],
    status: {
      tr: 'Aktif Çalışma',
      en: 'Active Study',
      de: 'Aktives Studium',
      ru: 'Активное изучение',
    },
  },
  {
    id: 'focus-data-pipeline',
    topic: {
      tr: 'İlişkisel Veritabanı Modelleme & SQL Sorguları',
      en: 'Relational Database Modeling & SQL Queries',
      de: 'Relationale Datenbankmodellierung & SQL-Abfragen',
      ru: 'Моделирование реляционных БД & SQL-запросы',
    },
    description: {
      tr: 'SQL Server üzerinde şema tasarımı, normalizasyon prensipleri ve verimli SQL sorguları yazma üzerine pratikler yapıyorum.',
      en: 'Practicing relational schema design, normalization principles, and writing structured SQL queries in SQL Server.',
      de: 'Praktische Übungen zum relationalen Schemadesign, Normalisierungsprinzipien und strukturierte SQL-Abfragen in SQL Server.',
      ru: 'Практика проектирования реляционных схем, принципов нормализации и написания структурированных SQL-запросов в SQL Server.',
    },
    technologies: ['SQL Server', 'T-SQL', 'Relational Modeling', 'Schema Design'],
    status: {
      tr: 'Pratik & Uygulama',
      en: 'Hands-on Practice',
      de: 'Praktische Übung',
      ru: 'Практика и упражнения',
    },
  },
  {
    id: 'focus-mlops',
    topic: {
      tr: 'Veri Analizi & Makine Öğrenmesi İş Akışları',
      en: 'Data Analysis & Machine Learning Workflows',
      de: 'Datenanalyse & Machine-Learning-Abläufe',
      ru: 'Анализ данных & Процессы машинного обучения',
    },
    description: {
      tr: 'Python ile veri önişleme, keşifsel analiz (EDA), dengesiz veri setlerinde SMOTE kullanımı ve sınıflandırma modellerini inceliyorum.',
      en: 'Exploring data preprocessing, exploratory analysis (EDA), SMOTE for imbalanced datasets, and classification estimators in Python.',
      de: 'Untersuchung von Datenvorverarbeitung, explorativer Analyse (EDA), SMOTE für unbalancierte Datensätze und Klassifikationsmodellen in Python.',
      ru: 'Изучение предобработки данных, разведочного анализа (EDA), применения SMOTE для дисбаланса классов и моделей классификации в Python.',
    },
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'CatBoost', 'Data Analysis'],
    status: {
      tr: 'Öğrenme & Deneme',
      en: 'Learning & Experimentation',
      de: 'Lernen & Experimentieren',
      ru: 'Обучение и эксперименты',
    },
  },
];
