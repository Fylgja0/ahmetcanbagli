import { LanguageId, ThemeId } from '@/types/portfolio';

export interface UiTranslations {
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    currentFocus: string;
    contact: string;
    toggleTheme: string;
    toggleLang: string;
    animations: string;
    animationActive: string;
    animationPaused: string;
    menuOpen: string;
    menuClose: string;
    brandSub: string;
    navIndex: string;
    mobileSub: string;
  };
  hero: {
    greeting: string;
    title: string;
    statusBadge: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    terminalPrefix: string;
    systemInit: string;
    focusAreas: string;
    statEducation: string;
    statFocus: string;
    statProjects: string;
    terminalUser: string;
    terminalUni: string;
    terminalProg: string;
    terminalRuntime: string;
    terminalArch: string;
    terminalDb: string;
    terminalPackages: string;
    terminalFocus: string;
    statInstitutionLabel: string;
    statProgramLabel: string;
    statProgramValue: string;
    statSourceLabel: string;
    statSourceValue: string;
  };
  about: {
    sectionTag: string;
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    principlesTitle: string;
    principles: {
      title: string;
      desc: string;
    }[];
    cvNotice: string;
  };
  skills: {
    sectionTag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    noFakeStatsNote: string;
    verifiedInRepo: string;
    verifiedCategory: string;
  };
  projects: {
    sectionTag: string;
    title: string;
    subtitle: string;
    viewDeepDive: string;
    viewGithub: string;
    sourceCode: string;
    keyHighlights: string;
    architectureHeader: string;
    engineeringHeader: string;
    roadmapHeader: string;
    modalClose: string;
    allProjectsBadge: string;
    prevProject: string;
    nextProject: string;
    swipeHint: string;
    categoryBackend: string;
    categoryDataScience: string;
    openSourceBadge: string;
    stackLabel: string;
    more: string;
    modalSpecBackend: string;
    modalSpecDataScience: string;
    modalSourceLabel: string;
    modalOverviewTitle: string;
    modalTechTitle: string;
    modalConceptsTitle: string;
    modalDismissHint: string;
    modalRepoButton: string;
  };
  education: {
    sectionTag: string;
    title: string;
    subtitle: string;
    curriculumHighlights: string;
    handsOnFocus: string;
    academicNote: string;
  };
  currentFocus: {
    sectionTag: string;
    title: string;
    subtitle: string;
    statusActive: string;
    statusExploring: string;
    targetStack: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    directEmailLabel: string;
    copyEmail: string;
    emailCopied: string;
    githubLabel: string;
    linkedinLabel: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    validationNameRequired: string;
    validationEmailRequired: string;
    validationEmailInvalid: string;
    validationMessageRequired: string;
    fallbackHelp: string;
    oneClickMail: string;
    formSendOptions: string;
    defaultSubject: string;
    sendViaGmail: string;
    sendViaOutlook: string;
    sendViaMailApp: string;
    draftReadyNotice: string;
    successTitle: string;
    mailBodySender: string;
    mailBodyReplyTo: string;
    mailBodyPortfolio: string;
    copyPrefixTo: string;
    copyPrefixSubject: string;
    copyFullMessage: string;
    copied: string;
    copyFailed: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    studentNote: string;
    backToTop: string;
    emailLabel: string;
  };
  themes: Record<ThemeId, string>;
}

export const translations: Record<LanguageId, UiTranslations> = {
  tr: {
    nav: {
      about: 'Hakkımda',
      skills: 'Yetenekler',
      projects: 'Projeler',
      education: 'Eğitim',
      currentFocus: 'Odak Alanları',
      contact: 'İletişim',
      toggleTheme: 'Tema Değiştir',
      toggleLang: 'Dil Seçin',
      animations: 'Animasyon',
      animationActive: 'Animasyon: Açık',
      animationPaused: 'Animasyon: Duraklatıldı',
      menuOpen: 'Menüyü Aç',
      menuClose: 'Menüyü Kapat',
      brandSub: 'MCBU Büyük Veri Analitiği',
      navIndex: 'Gezinme Menüsü',
      mobileSub: 'MCBU Büyük Veri',
    },
    hero: {
      greeting: 'Merhaba, ben',
      title: 'Büyük Veri Analitiği Öğrencisi & Yazılımcı Adayı',
      statusBadge: 'MCBU Büyük Veri Analitiği (Önlisans) · Yazılımcı Adayı',
      headline: 'C# / .NET & Python Veri Bilimi ve SQL',
      subheadline:
        'C# ve .NET 10 ile nesne yönelimli programlama ve Entity Framework Core veritabanı operasyonları geliştiriyor; Python ile veri analizi ve makine öğrenmesi süreçlerini öğreniyorum.',
      primaryCta: 'Projeleri İncele',
      secondaryCta: 'İletişime Geç',
      terminalPrefix: 'ahmetcan@mcbu:~$',
      systemInit: 'C# / .NET 10 ve Python çalışma ortamı hazır.',
      focusAreas: 'Temel Odak: C# · .NET · SQL · Python Veri Analizi',
      statEducation: 'Manisa Celal Bayar Üniv.',
      statFocus: 'Büyük Veri Analitiği',
      statProjects: 'Açık Kaynak Kodlu Projeler',
      terminalUser: 'Ahmetcan Bağlı [Öğrenci & Yazılımcı Adayı]',
      terminalUni: 'Üniversite: Manisa Celal Bayar Üniversitesi',
      terminalProg: 'Program: Büyük Veri Analitiği (Önlisans)',
      terminalRuntime: 'Çalışma Zamanı: .NET 10 / C# / Entity Framework Core 10',
      terminalArch: 'Mimari: OOP Sınıf Hiyerarşisi, DbContext, LINQ',
      terminalDb: 'Veritabanı: Microsoft SQL Server, Code-First Migrasyonları',
      terminalPackages: 'Kütüphaneler: Pandas, NumPy, Scikit-learn, CatBoost, imbalanced-learn',
      terminalFocus: 'Odak: Dengesiz veri (SMOTE), EDA, Sınıflandırma',
      statInstitutionLabel: 'KURUM',
      statProgramLabel: 'PROGRAM',
      statProgramValue: 'Büyük Veri',
      statSourceLabel: 'KOD',
      statSourceValue: 'GitHub Açık',
    },
    about: {
      sectionTag: '// 01. KİMLİK & YAKLAŞIM',
      title: 'Hakkımda & Çalışma Yaklaşımı',
      subtitle: 'Akademik eğitim, veritabanı ilgisi ve kod geliştirme motivasyonu.',
      p1:
        'Manisa Celal Bayar Üniversitesi Büyük Veri Analitiği önlisans programında öğrenim görüyorum. Yazılım geliştirme alanında kendimi C#/.NET ve Python veri analitiği ekseninde geliştiriyorum.',
      p2:
        'C# ve .NET 10 ekosisteminde nesne yönelimli programlama prensipleri (OOP), Entity Framework Core ile Code-First veritabanı yapılandırması ve LINQ sorguları üzerinde çalışıyorum. Eş zamanlı olarak Python ile veri temizleme, keşifsel veri analizi ve makine öğrenmesi sınıflandırma algoritmaları üzerinde pratik yapıyorum.',
      p3:
        'Şişirilmiş unvanlar ve yapay yüzdeler yerine, GitHub üzerinde incelenebilen somut proje kodlarına ve veritabanı ilişkilerinin doğruluğuna odaklanıyorum.',
      principlesTitle: 'Çalışma İlkelerim',
      principles: [
        {
          title: 'Nesne Yönelimli Kodlama',
          desc: 'C# sınıfları, kalıtım ve anlaşılır nesne yönelimli yapılar.',
        },
        {
          title: 'İlişkisel Veri Bütünlüğü',
          desc: 'SQL Server tablolarında doğru yabancı anahtar ilişkileri ve EF Core migrasyonları.',
        },
        {
          title: 'Veri Analizi Disiplini',
          desc: 'Pandas ile veri ön işleme, SMOTE ile dengesizlik çözümü ve gerçekçi model değerlendirmesi.',
        },
      ],
      cvNotice: 'Tüm projelerimin kaynak kodları GitHub üzerinde açıktır.',
    },
    skills: {
      sectionTag: '// 02. TEKNOLOJİ ALANLARI',
      title: 'Teknolojiler & Yetkinlikler',
      subtitle: 'Gerçek projelerde kullanılan diller, kütüphaneler ve geliştirme araçları.',
      filterAll: 'Tüm Alanlar',
      noFakeStatsNote: 'Yapay yüzdelik çubuklar yerine projelerde aktif kullanılan teknolojiler listelenmiştir.',
      verifiedInRepo: 'Proje kodlarında doğrulandı',
      verifiedCategory: 'Code-First / Python Veri Analizi',
    },
    projects: {
      sectionTag: '// 03. PROJELER',
      title: 'Teknik Projeler & Detaylar',
      subtitle: 'C#/.NET veritabanı uygulaması ve Python makine öğrenmesi veri analitiği çalışması.',
      viewDeepDive: 'Teknik Detayları Aç',
      viewGithub: 'GitHub Kaynak Kodu',
      sourceCode: 'Kaynak Kod',
      keyHighlights: 'Öne Çıkan Başlıklar',
      architectureHeader: 'Proje Bileşenleri & Durum',
      engineeringHeader: 'Uygulanan Yöntemler & Kararlar',
      roadmapHeader: 'Gelecek Yol Haritası',
      modalClose: 'Kapat (Esc)',
      allProjectsBadge: 'Kaynak Kod Açık',
      prevProject: 'Önceki Proje',
      nextProject: 'Sonraki Proje',
      swipeHint: 'Mobilde kaydırarak projeler arasında geçiş yapabilirsiniz',
      categoryBackend: 'C# / .NET VERİTABANI PROJESİ',
      categoryDataScience: 'PYTHON VERİ BİLİMİ PROJESİ',
      openSourceBadge: 'GitHub Açık Kaynak',
      stackLabel: 'Teknolojiler:',
      more: 'daha fazla',
      modalSpecBackend: '// ARKA UÇ SPESİFİKASYONU',
      modalSpecDataScience: '// VERİ BİLİMİ SPESİFİKASYONU',
      modalSourceLabel: 'İncelenebilir Kaynak Kod:',
      modalOverviewTitle: '[01] Proje Özeti & Kapsam',
      modalTechTitle: '[02] Teknolojiler & Kütüphaneler',
      modalConceptsTitle: '[03] Temel Kavramlar & Yaklaşımlar',
      modalDismissHint: 'Kapatmak için Esc tuşuna basın veya dışarı tıklayın',
      modalRepoButton: 'GitHub Deposu',
    },
    education: {
      sectionTag: '// 04. AKADEMİK BİLGİ',
      title: 'Eğitim & Akademik Bilgiler',
      subtitle: 'Büyük veri, istatistik ve programlama temellerini kapsayan üniversite eğitimi.',
      curriculumHighlights: 'Temel Dersler',
      handsOnFocus: 'Laboratuvar & Pratik Uygulama',
      academicNote: 'Derslerde edinilen teorik bilgileri bağımsız C#/.NET ve Python projelerinde uygulamaktayım.',
    },
    currentFocus: {
      sectionTag: '// 05. AKTİF ÇALIŞMALAR',
      title: 'Şu Anda Üzerinde Çalıştığım Konular',
      subtitle: 'Teknik becerileri geliştirmek için aktif olarak üzerinde durduğum alanlar.',
      statusActive: 'Aktif Çalışma',
      statusExploring: 'Pratik Aşamasında',
      targetStack: 'İlgili Teknolojiler:',
    },
    contact: {
      sectionTag: '// 06. İLETİŞİM',
      title: 'İletişime Geçin',
      subtitle: 'Staj olanakları, öğrenci aday rolleri veya teknik paylaşımlar için ulaşabilirsiniz.',
      directEmailLabel: 'Doğrudan E-Posta',
      copyEmail: 'E-postayı Kopyala',
      emailCopied: 'E-posta panoya kopyalandı!',
      githubLabel: 'GitHub Profili',
      linkedinLabel: 'LinkedIn Profili',
      formTitle: 'Mesaj Gönderin',
      formSubtitle: 'Mesajınızı hazırlayıp tercih ettiğiniz e-posta servisiyle gönderebilirsiniz.',
      nameLabel: 'Adınız Soyadınız',
      namePlaceholder: 'Örn: Ahmet Yılmaz',
      emailLabel: 'E-Posta Adresiniz',
      emailPlaceholder: 'ornek@alanadi.com',
      subjectLabel: 'Konu',
      subjectPlaceholder: 'Örn: Staj / İletişim',
      messageLabel: 'Mesajınız',
      messagePlaceholder: 'Mesajınızı bu alana yazabilirsiniz...',
      validationNameRequired: 'Lütfen adınızı girin.',
      validationEmailRequired: 'Lütfen e-posta adresinizi girin.',
      validationEmailInvalid: 'Geçerli bir e-posta formatı girin.',
      validationMessageRequired: 'Lütfen en az 10 karakterden oluşan bir mesaj yazın.',
      fallbackHelp: 'Form doldurmak istemiyorsanız, doğrudan aşağıdaki bağlantılardan birine tıklayarak e-posta uygulamanızda boş bir taslak açabilirsiniz:',
      oneClickMail: 'Formsuz Hızlı E-Posta Başlatıcı',
      formSendOptions: 'Formu Seçtiğiniz E-Posta Servisiyle Gönderin:',
      defaultSubject: 'Portfolyo İletişimi - Yazılımcı Adayı',
      sendViaGmail: 'Gmail ile Gönder',
      sendViaOutlook: 'Outlook ile Gönder',
      sendViaMailApp: 'Cihazdaki Mail Uygulaması ile Gönder',
      draftReadyNotice: 'Mesajınız seçtiğiniz e-posta uygulamasında hazırlanıyor.',
      successTitle: 'E-posta Hazırlanıyor',
      mailBodySender: 'Gönderen',
      mailBodyReplyTo: 'E-posta',
      mailBodyPortfolio: 'Portfolyo',
      copyPrefixTo: 'Alıcı',
      copyPrefixSubject: 'Konu',
      copyFullMessage: 'Mesaj Detaylarını Kopyala',
      copied: 'Kopyalandı!',
      copyFailed: 'Kopyalanamadı',
    },
    footer: {
      builtWith: 'Next.js (App Router), TypeScript & Tailwind CSS ile hazırlanmıştır.',
      rights: 'Tüm hakları saklıdır.',
      studentNote: 'Ahmetcan Bağlı · Manisa Celal Bayar Üniversitesi Büyük Veri Analitiği Öğrencisi (Önlisans)',
      backToTop: 'Yukarı Çık',
      emailLabel: 'E-Posta',
    },
    themes: {
      matrix: 'Matrix Siber (Yeşil)',
      quantum: 'Fütüristik Kuantum (Camgöbeği)',
      gothic: 'Karanlık Gotik Teknoloji (Kızıl)',
    },
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      currentFocus: 'Current Focus',
      contact: 'Contact',
      toggleTheme: 'Switch Theme',
      toggleLang: 'Select Language',
      animations: 'Animations',
      animationActive: 'Animation: On',
      animationPaused: 'Animation: Paused',
      menuOpen: 'Open Menu',
      menuClose: 'Close Menu',
      brandSub: 'MCBU Big Data Analytics',
      navIndex: 'Navigation Index',
      mobileSub: 'MCBU Big Data',
    },
    hero: {
      greeting: "Hello, I'm",
      title: 'Big Data Analytics Student & Software Developer Candidate',
      statusBadge: 'MCBU Big Data Analytics (Associate Degree) · Software Developer Candidate',
      headline: 'C# / .NET & Python Data Science and SQL',
      subheadline:
        'Practicing object-oriented programming with C# and .NET 10, database operations with Entity Framework Core 10, and data science workflows in Python.',
      primaryCta: 'Explore Projects',
      secondaryCta: 'Get in Touch',
      terminalPrefix: 'ahmetcan@mcbu:~$',
      systemInit: 'C# / .NET 10 and Python runtime ready.',
      focusAreas: 'Core Focus: C# · .NET 10 · SQL Server · Python Data Science',
      statEducation: 'Manisa Celal Bayar Univ.',
      statFocus: 'Big Data Analytics',
      statProjects: 'Open Source Projects',
      terminalUser: 'Ahmetcan Bağlı [Student & Software Developer Candidate]',
      terminalUni: 'University: Manisa Celal Bayar University',
      terminalProg: 'Program: Big Data Analytics (Associate Degree)',
      terminalRuntime: 'Runtime: .NET 10 / C# / Entity Framework Core 10',
      terminalArch: 'Architecture: OOP Class Hierarchy, DbContext, LINQ',
      terminalDb: 'Database: Microsoft SQL Server, Code-First Migrations',
      terminalPackages: 'Packages: Pandas, NumPy, Scikit-learn, CatBoost, imbalanced-learn',
      terminalFocus: 'Focus: Imbalanced data (SMOTE), EDA, Classification',
      statInstitutionLabel: 'INSTITUTION',
      statProgramLabel: 'PROGRAM',
      statProgramValue: 'Big Data',
      statSourceLabel: 'CODE',
      statSourceValue: 'GitHub Verified',
    },
    about: {
      sectionTag: '// 01. IDENTITY & APPROACH',
      title: 'About & Development Approach',
      subtitle: 'Academic training, database interest, and hands-on coding motivation.',
      p1:
        'I am an associate degree student in the Big Data Analytics program at Manisa Celal Bayar University. I focus on developing practical software skills across C#/.NET backend fundamentals and Python data analysis.',
      p2:
        'In the C# and .NET 10 ecosystem, I work with object-oriented programming principles (OOP), Entity Framework Core Code-First database schemas, and LINQ queries. In parallel, I use Python for data cleaning, exploratory analysis, and evaluating classification models on tabular data.',
      p3:
        'Rather than claiming artificial seniority or using inflated percentage bars, I focus on verifiable code on GitHub and disciplined database design.',
      principlesTitle: 'Core Principles',
      principles: [
        {
          title: 'Object-Oriented Programming',
          desc: 'Clear class hierarchies, inheritance, and readable C# object structures.',
        },
        {
          title: 'Relational Data Integrity',
          desc: 'SQL Server schema modeling with foreign key relationships and EF Core migrations.',
        },
        {
          title: 'Data Science Discipline',
          desc: 'Pandas data preparation, SMOTE for class imbalance, and balanced evaluation metrics.',
        },
      ],
      cvNotice: 'All project repositories are publicly accessible on GitHub for review.',
    },
    skills: {
      sectionTag: '// 02. TECHNICAL SKILLS',
      title: 'Skills & Technologies',
      subtitle: 'Languages, libraries, and developer tools used in actual projects without arbitrary percentage bars.',
      filterAll: 'All Areas',
      noFakeStatsNote: 'Technologies are presented based on demonstrated projects rather than arbitrary percentage bars.',
      verifiedInRepo: 'Verified in project code',
      verifiedCategory: 'Code-First / Python Data Analysis',
    },
    projects: {
      sectionTag: '// 03. PROJECTS',
      title: 'Projects & Technical Breakdown',
      subtitle: 'A C#/.NET database-backed application and a Python machine learning data analysis study.',
      viewDeepDive: 'Technical Deep Dive',
      viewGithub: 'GitHub Repository',
      sourceCode: 'Source Code',
      keyHighlights: 'Key Highlights',
      architectureHeader: 'Components & Project State',
      engineeringHeader: 'Applied Methods & Technical Decisions',
      roadmapHeader: 'Future Roadmap',
      modalClose: 'Close (Esc)',
      allProjectsBadge: 'Publicly Auditable',
      prevProject: 'Previous Project',
      nextProject: 'Next Project',
      swipeHint: 'Swipe horizontally on mobile to navigate between projects',
      categoryBackend: 'C# / .NET DATABASE PROJECT',
      categoryDataScience: 'PYTHON DATA SCIENCE PROJECT',
      openSourceBadge: 'GitHub Open Source',
      stackLabel: 'Stack:',
      more: 'more',
      modalSpecBackend: '// BACKEND SPECIFICATION',
      modalSpecDataScience: '// DATA SCIENCE SPECIFICATION',
      modalSourceLabel: 'Auditable Source Code:',
      modalOverviewTitle: '[01] Project Overview & Scope',
      modalTechTitle: '[02] Technologies & Libraries',
      modalConceptsTitle: '[03] Key Concepts & Applied Methods',
      modalDismissHint: 'Press Esc or click outside to dismiss',
      modalRepoButton: 'GitHub Repo',
    },
    education: {
      sectionTag: '// 04. ACADEMIC BACKGROUND',
      title: 'Education & Training',
      subtitle: 'Associate degree coursework covering big data foundations, database systems, and programming.',
      curriculumHighlights: 'Core Coursework',
      handsOnFocus: 'Applied Laboratory Work',
      academicNote: 'I reinforce academic coursework with independent C#/.NET and Python coding projects.',
    },
    currentFocus: {
      sectionTag: '// 05. CURRENT FOCUS',
      title: 'Current Focus Areas',
      subtitle: 'Active topics of study and practical skill development.',
      statusActive: 'Active Study',
      statusExploring: 'Hands-on Practice',
      targetStack: 'Target Stack:',
    },
    contact: {
      sectionTag: '// 06. CONTACT',
      title: 'Get in Touch',
      subtitle: 'Available for internship opportunities, student candidate roles, or technical questions.',
      directEmailLabel: 'Direct Email',
      copyEmail: 'Copy Email Address',
      emailCopied: 'Email copied to clipboard!',
      githubLabel: 'GitHub Profile',
      linkedinLabel: 'LinkedIn Profile',
      formTitle: 'Send a Message',
      formSubtitle: 'Prepare your message below to send it via your preferred email service.',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. Internship Inquiry / Technical Collaboration',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Write your message here...',
      validationNameRequired: 'Please provide your name.',
      validationEmailRequired: 'Please provide your email address.',
      validationEmailInvalid: 'Please provide a valid email format.',
      validationMessageRequired: 'Message must contain at least 10 characters.',
      fallbackHelp: 'Prefer not to fill out the form? Click any link below to launch a blank draft addressed directly to Ahmetcan in your preferred email client:',
      oneClickMail: 'Quick 1-Click Mail Launchers',
      formSendOptions: 'Send Form via Your Preferred Mail Service:',
      defaultSubject: 'Portfolio Inquiry - Software Developer Candidate',
      sendViaGmail: 'Send via Gmail',
      sendViaOutlook: 'Send via Outlook',
      sendViaMailApp: 'Send via Device Mail App',
      draftReadyNotice: 'Your message is being prepared in your selected email service.',
      successTitle: 'Preparing Email',
      mailBodySender: 'Sender',
      mailBodyReplyTo: 'Reply-To',
      mailBodyPortfolio: 'Portfolio',
      copyPrefixTo: 'To',
      copyPrefixSubject: 'Subject',
      copyFullMessage: 'Copy Message Details',
      copied: 'Copied!',
      copyFailed: 'Copy failed',
    },
    footer: {
      builtWith: 'Engineered with Next.js (App Router), TypeScript & Tailwind CSS.',
      rights: 'All rights reserved.',
      studentNote: 'Ahmetcan Bağlı · Big Data Analytics Student (Associate Degree) at Manisa Celal Bayar University',
      backToTop: 'Back to Top',
      emailLabel: 'Email',
    },
    themes: {
      matrix: 'Matrix Cyber (Emerald)',
      quantum: 'Futuristic Quantum (Cyan)',
      gothic: 'Dark Gothic Tech (Crimson)',
    },
  },
  de: {
    nav: {
      about: 'Über mich',
      skills: 'Kenntnisse',
      projects: 'Projekte',
      education: 'Ausbildung',
      currentFocus: 'Fokus',
      contact: 'Kontakt',
      toggleTheme: 'Design wechseln',
      toggleLang: 'Sprache wählen',
      animations: 'Animation',
      animationActive: 'Animation: Aktiv',
      animationPaused: 'Animation: Pausiert',
      menuOpen: 'Menü öffnen',
      menuClose: 'Menü schließen',
      brandSub: 'MCBU Big Data Analytics',
      navIndex: 'Navigationsmenü',
      mobileSub: 'MCBU Big Data',
    },
    hero: {
      greeting: 'Hallo, ich bin',
      title: 'Student für Big Data Analytics & Softwareentwickler-Kandidat',
      statusBadge: 'MCBU Big Data Analytics (Associate Degree) · Softwareentwickler-Kandidat',
      headline: 'C# / .NET & Python Data Science und SQL',
      subheadline:
        'Praktische Entwicklung mit C# und .NET 10, Entity Framework Core 10 Datenbankoperationen und Machine-Learning-Abläufe mit Python.',
      primaryCta: 'Projekte ansehen',
      secondaryCta: 'Kontakt aufnehmen',
      terminalPrefix: 'ahmetcan@mcbu:~$',
      systemInit: 'C# / .NET 10 und Python Umgebung bereit.',
      focusAreas: 'Schwerpunkte: C# · .NET 10 · SQL Server · Python Data Science',
      statEducation: 'Manisa Celal Bayar Univ.',
      statFocus: 'Big Data Analytics',
      statProjects: 'Open-Source-Projekte',
      terminalUser: 'Ahmetcan Bağlı [Student & Softwareentwickler-Kandidat]',
      terminalUni: 'Universität: Manisa Celal Bayar Universität',
      terminalProg: 'Studiengang: Big Data Analytics (Associate Degree)',
      terminalRuntime: 'Laufzeit: .NET 10 / C# / Entity Framework Core 10',
      terminalArch: 'Architektur: OOP-Klassenhierarchie, DbContext, LINQ',
      terminalDb: 'Datenbank: Microsoft SQL Server, Code-First Migrationen',
      terminalPackages: 'Pakete: Pandas, NumPy, Scikit-learn, CatBoost, imbalanced-learn',
      terminalFocus: 'Fokus: Unbalancierte Daten (SMOTE), EDA, Klassifikation',
      statInstitutionLabel: 'INSTITUTION',
      statProgramLabel: 'STUDIENGANG',
      statProgramValue: 'Big Data',
      statSourceLabel: 'CODE',
      statSourceValue: 'GitHub-geprüft',
    },
    about: {
      sectionTag: '// 01. IDENTITÄT & ANSATZ',
      title: 'Über mich & Arbeitsweise',
      subtitle: 'Akademische Ausbildung, Datenbankinteresse und strukturierte Programmierung.',
      p1:
        'Ich bin Student im Studiengang Big Data Analytics (Associate Degree) an der Manisa Celal Bayar Universität. Mein Fokus liegt auf C#/.NET-Grundlagen und Datenanalyse mit Python.',
      p2:
        'Im C# und .NET 10 Ökosystem arbeite ich mit objektorientierter Programmierung (OOP), Entity Framework Core Code-First-Modellierung und LINQ-Abfragen. Parallel nutze ich Python für Datenbereinigung, explorative Datenanalyse und die Auswertung von Klassifikationsmodellen.',
      p3:
        'Statt übertriebener Behauptungen konzentriere ich mich auf nachprüfbaren Quellcode auf GitHub und sauberes relationales Datenbankdesign.',
      principlesTitle: 'Arbeitsprinzipien',
      principles: [
        {
          title: 'Objektorientierte Programmierung',
          desc: 'Strukturierte Klassen, Vererbung und lesbarer C#-Code.',
        },
        {
          title: 'Relationale Integrität',
          desc: 'SQL Server Tabellendesign mit Fremdschlüsseln und EF Core Migrationen.',
        },
        {
          title: 'Data-Science-Methodik',
          desc: 'Datenvorbereitung mit Pandas, SMOTE bei unbalancierten Klassen und fundierte Metriken.',
        },
      ],
      cvNotice: 'Alle Projekt-Repositories sind auf GitHub öffentlich einsehbar.',
    },
    skills: {
      sectionTag: '// 02. TECHNOLOGISCHE KENNTNISSE',
      title: 'Kenntnisse & Technologien',
      subtitle: 'Praktische Werkzeuge und Programmiersprachen ohne willkürliche Prozentangaben.',
      filterAll: 'Alle Bereiche',
      noFakeStatsNote: 'Technologien basieren auf realen Projektumsetzungen ohne fiktive Prozentbalken.',
      verifiedInRepo: 'Im Projektcode verifiziert',
      verifiedCategory: 'Code-First / Python-Datenanalyse',
    },
    projects: {
      sectionTag: '// 03. PROJEKTE',
      title: 'Projekte & Technische Analyse',
      subtitle: 'Eine datenbankgestützte C#/.NET-Anwendung und eine Data-Science-Studie in Python.',
      viewDeepDive: 'Technische Details ansehen',
      viewGithub: 'GitHub Repository',
      sourceCode: 'Quellcode',
      keyHighlights: 'Wichtige Highlights',
      architectureHeader: 'Komponenten & Projektstand',
      engineeringHeader: 'Angewandte Methoden & Entscheidungen',
      roadmapHeader: 'Zukünftige Roadmap',
      modalClose: 'Schließen (Esc)',
      allProjectsBadge: 'Open Source',
      prevProject: 'Vorheriges Projekt',
      nextProject: 'Nächstes Projekt',
      swipeHint: 'Auf Mobilgeräten horizontal wischen zum Wechseln',
      categoryBackend: 'C# / .NET DATENBANKPROJEKT',
      categoryDataScience: 'PYTHON DATA-SCIENCE-PROJEKT',
      openSourceBadge: 'GitHub Open Source',
      stackLabel: 'Technologien:',
      more: 'weitere',
      modalSpecBackend: '// BACKEND-SPEZIFIKATION',
      modalSpecDataScience: '// DATA-SCIENCE-SPEZIFIKATION',
      modalSourceLabel: 'Einsehbarer Quellcode:',
      modalOverviewTitle: '[01] Projektübersicht & Umfang',
      modalTechTitle: '[02] Technologien & Bibliotheken',
      modalConceptsTitle: '[03] Kernkonzepte & Angewandte Methoden',
      modalDismissHint: 'Drücken Sie Esc oder klicken Sie nach außen zum Schließen',
      modalRepoButton: 'GitHub-Repo',
    },
    education: {
      sectionTag: '// 04. AKADEMISCHER WERDEGANG',
      title: 'Ausbildung & Studium',
      subtitle: 'Grundlagenstudium (Associate Degree) zu Big Data, Datenbanken und Programmierung.',
      curriculumHighlights: 'Kernfächer',
      handsOnFocus: 'Praktische Laborarbeit',
      academicNote: 'Ergänzend zum Studium vertiefe ich mein Wissen in eigenständigen Projekten auf C# und Python.',
    },
    currentFocus: {
      sectionTag: '// 05. AKTUELLE INITIATIVEN',
      title: 'Aktuelle Schwerpunkte',
      subtitle: 'Themen, mit denen ich mich derzeit aktiv beschäftige.',
      statusActive: 'Aktives Studium',
      statusExploring: 'Praktische Übung',
      targetStack: 'Ziel-Stack:',
    },
    contact: {
      sectionTag: '// 06. KONTAKT',
      title: 'Kontakt aufnehmen',
      subtitle: 'Offen für Praktika, Einstiegsrollen und fachlichen Austausch.',
      directEmailLabel: 'Direkte E-Mail',
      copyEmail: 'E-Mail-Adresse kopieren',
      emailCopied: 'E-Mail in die Zwischenablage kopiert!',
      githubLabel: 'GitHub-Profil',
      linkedinLabel: 'LinkedIn-Profil',
      formTitle: 'Nachricht senden',
      formSubtitle: 'Bereiten Sie Ihre Nachricht vor, um sie über Ihren bevorzugten E-Mail-Dienst zu versenden.',
      nameLabel: 'Ihr vollständiger Name',
      namePlaceholder: 'z.B. Max Mustermann',
      emailLabel: 'Ihre E-Mail-Adresse',
      emailPlaceholder: 'name@beispiel.de',
      subjectLabel: 'Betreff',
      subjectPlaceholder: 'z.B. Praktikumsanfrage / Projektfrage',
      messageLabel: 'Ihre Nachricht',
      messagePlaceholder: 'Geben Sie hier Ihre Nachricht ein...',
      validationNameRequired: 'Bitte geben Sie Ihren Namen an.',
      validationEmailRequired: 'Bitte geben Sie Ihre E-Mail-Adresse an.',
      validationEmailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
      validationMessageRequired: 'Die Nachricht muss mindestens 10 Zeichen lang sein.',
      fallbackHelp: 'Möchten Sie das Formular nicht ausfüllen? Klicken Sie unten, um direkt einen Entwurf in Ihrem E-Mail-Programm zu öffnen:',
      oneClickMail: '1-Klick Direkt-Mail-Start',
      formSendOptions: 'Formular über Ihren E-Mail-Dienst senden:',
      defaultSubject: 'Portfolio-Kontakt - Softwareentwickler-Kandidat',
      sendViaGmail: 'Mit Gmail senden',
      sendViaOutlook: 'Mit Outlook senden',
      sendViaMailApp: 'Mit Standard-Mail-App senden',
      draftReadyNotice: 'Die Nachricht wird in Ihrem ausgewählten E-Mail-Dienst vorbereitet.',
      successTitle: 'E-Mail wird vorbereitet',
      mailBodySender: 'Absender',
      mailBodyReplyTo: 'Antwort an',
      mailBodyPortfolio: 'Portfolio',
      copyPrefixTo: 'An',
      copyPrefixSubject: 'Betreff',
      copyFullMessage: 'Nachrichtendetails kopieren',
      copied: 'Kopiert!',
      copyFailed: 'Kopieren fehlgeschlagen',
    },
    footer: {
      builtWith: 'Erstellt mit Next.js (App Router), TypeScript & Tailwind CSS.',
      rights: 'Alle Rechte vorbehalten.',
      studentNote: 'Ahmetcan Bağlı · Student für Big Data Analytics (Associate Degree), Manisa Celal Bayar Universität',
      backToTop: 'Nach oben',
      emailLabel: 'E-Mail',
    },
    themes: {
      matrix: 'Matrix Cyber (Smaragdgrün)',
      quantum: 'Futuristisches Quanten (Cyan)',
      gothic: 'Dark Gothic Tech (Karmesinrot)',
    },
  },
  ru: {
    nav: {
      about: 'Обо мне',
      skills: 'Навыки',
      projects: 'Проекты',
      education: 'Образование',
      currentFocus: 'Текущий фокус',
      contact: 'Контакты',
      toggleTheme: 'Сменить тему',
      toggleLang: 'Выбрать язык',
      animations: 'Анимация',
      animationActive: 'Анимация: Вкл',
      animationPaused: 'Анимация: Пауза',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      brandSub: 'MCBU Анализ больших данных',
      navIndex: 'Навигация',
      mobileSub: 'MCBU Большие данные',
    },
    hero: {
      greeting: 'Привет, я',
      title: 'Студент направления «Анализ больших данных» & Кандидат в разработчики ПО',
      statusBadge: 'MCBU Анализ больших данных (Associate Degree) · Кандидат в разработчики ПО',
      headline: 'C# / .NET & Python Data Science и SQL',
      subheadline:
        'Практикую объектно-ориентированное программирование на C# и .NET 10, работу с базой данных через Entity Framework Core 10 и анализ данных на Python.',
      primaryCta: 'Смотреть проекты',
      secondaryCta: 'Связаться со мной',
      terminalPrefix: 'ahmetcan@mcbu:~$',
      systemInit: 'Среда C# / .NET 10 и Python готова к работе.',
      focusAreas: 'Ключевые области: C# · .NET 10 · SQL Server · Python Data Science',
      statEducation: 'Университет Маниса Джелал Баяр',
      statFocus: 'Анализ больших данных',
      statProjects: 'Открытые проекты',
      terminalUser: 'Ахметджан Баглы [Студент & Кандидат в разработчики]',
      terminalUni: 'Университет: Университет Маниса Джелал Баяр',
      terminalProg: 'Программа: Анализ больших данных (Associate Degree)',
      terminalRuntime: 'Среда: .NET 10 / C# / Entity Framework Core 10',
      terminalArch: 'Архитектура: ООП-иерархия классов, DbContext, LINQ',
      terminalDb: 'База данных: Microsoft SQL Server, Code-First миграции',
      terminalPackages: 'Пакеты: Pandas, NumPy, Scikit-learn, CatBoost, imbalanced-learn',
      terminalFocus: 'Фокус: Дисбаланс данных (SMOTE), EDA, Классификация',
      statInstitutionLabel: 'ЗАВЕДЕНИЕ',
      statProgramLabel: 'ПРОГРАММА',
      statProgramValue: 'Большие данные',
      statSourceLabel: 'КОД',
      statSourceValue: 'GitHub открытый',
    },
    about: {
      sectionTag: '// 01. О СЕБЕ И ПОДХОДЕ',
      title: 'Обо мне & Подход к разработке',
      subtitle: 'Академическая подготовка, интерес к базам данных и практический код.',
      p1:
        'Я студент программы Associate Degree по направлению «Анализ больших данных» в Университете Маниса Джелал Баяр. Развиваю практические навыки в разработке на C#/.NET и анализе данных на Python.',
      p2:
        'В экосистеме C# и .NET 10 изучаю объектно-ориентированное программирование (ООП), построение схем баз данных через Entity Framework Core Code-First и запросы LINQ. Параллельно использую Python для предобработки данных, разведочного анализа и оценки моделей классификации.',
      p3:
        'Вместо вымышленных должностей и фиктивных процентов я ориентируюсь на проверяемый исходный код на GitHub и корректность проектирования баз данных.',
      principlesTitle: 'Принципы работы',
      principles: [
        {
          title: 'Объектно-ориентированный подход',
          desc: 'Иерархии классов, наследование и понятная структура кода на C#.',
        },
        {
          title: 'Целостность реляционных данных',
          desc: 'Схемы SQL Server с внешними ключами и миграциями EF Core.',
        },
        {
          title: 'Дисциплина анализа данных',
          desc: 'Очистка данных в Pandas, метод SMOTE для балансировки и честная оценка метрик.',
        },
      ],
      cvNotice: 'Все проекты открыты и доступны в репозиториях на GitHub.',
    },
    skills: {
      sectionTag: '// 02. ТЕХНОЛОГИЧЕСКИЙ СТЕК',
      title: 'Навыки & Технологии',
      subtitle: 'Инструменты и языки, применяемые в реальных проектах, без произвольных процентов.',
      filterAll: 'Все области',
      noFakeStatsNote: 'Технологии представлены на основе практического кода в проектах без фиктивных шкал.',
      verifiedInRepo: 'Проверено в коде проектов',
      verifiedCategory: 'Code-First / Анализ данных на Python',
    },
    projects: {
      sectionTag: '// 03. ПРОЕКТЫ',
      title: 'Проекты & Технический анализ',
      subtitle: 'Приложение для работы с БД на C#/.NET и учебное исследование по машинному обучению на Python.',
      viewDeepDive: 'Технические подробности',
      viewGithub: 'Репозиторий GitHub',
      sourceCode: 'Исходный код',
      keyHighlights: 'Ключевые особенности',
      architectureHeader: 'Компоненты и статус проекта',
      engineeringHeader: 'Примененные методы и решения',
      roadmapHeader: 'Планы развития',
      modalClose: 'Закрыть (Esc)',
      allProjectsBadge: 'Открытый код',
      prevProject: 'Предыдущий проект',
      nextProject: 'Следующий проект',
      swipeHint: 'Свайпайте влево/вправо на мобильном устройстве для переключения',
      categoryBackend: 'ПРОЕКТ БАЗЫ ДАННЫХ C# / .NET',
      categoryDataScience: 'ПРОЕКТ ПО ДАННЫМ НА PYTHON',
      openSourceBadge: 'Открытый код на GitHub',
      stackLabel: 'Стек:',
      more: 'еще',
      modalSpecBackend: '// СПЕЦИФИКАЦИЯ: БЭКЕНД',
      modalSpecDataScience: '// СПЕЦИФИКАЦИЯ: DATA SCIENCE',
      modalSourceLabel: 'Открытый исходный код:',
      modalOverviewTitle: '[01] Обзор и назначение проекта',
      modalTechTitle: '[02] Технологии и библиотеки',
      modalConceptsTitle: '[03] Ключевые концепции и методы',
      modalDismissHint: 'Нажмите Esc или кликните вне окна для закрытия',
      modalRepoButton: 'Репозиторий GitHub',
    },
    education: {
      sectionTag: '// 04. ОБРАЗОВАНИЕ',
      title: 'Образование & Академическая подготовка',
      subtitle: 'Университетская программа (Associate Degree) по анализу больших данных, базам данных и программированию.',
      curriculumHighlights: 'Ключевые дисциплины',
      handsOnFocus: 'Лабораторные и практические работы',
      academicNote: 'Учебный материал закрепляю в самостоятельных проектах на C#/.NET и Python.',
    },
    currentFocus: {
      sectionTag: '// 05. ТЕКУЩИЙ ФОКУС',
      title: 'Текущий фокус & Развитие',
      subtitle: 'Темы, которые я активно изучаю и закрепляю на практике прямо сейчас.',
      statusActive: 'Активное изучение',
      statusExploring: 'Практические задания',
      targetStack: 'Технологический стек:',
    },
    contact: {
      sectionTag: '// 06. КОНТАКТЫ',
      title: 'Связаться со мной',
      subtitle: 'Открыт к предложениям о стажировках, начальным ролям и профессиональным вопросам.',
      directEmailLabel: 'Прямая почта',
      copyEmail: 'Скопировать e-mail',
      emailCopied: 'E-mail скопирован в буфер обмена!',
      githubLabel: 'Профиль GitHub',
      linkedinLabel: 'Профиль LinkedIn',
      formTitle: 'Отправить сообщение',
      formSubtitle: 'Подготовьте сообщение для отправки через удобный почтовый сервис.',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Например: Иван Петров',
      emailLabel: 'Ваш e-mail',
      emailPlaceholder: 'name@example.com',
      subjectLabel: 'Тема сообщения',
      subjectPlaceholder: 'Например: Вопрос по проектам / Стажировка',
      messageLabel: 'Текст сообщения',
      messagePlaceholder: 'Опишите ваше обращение...',
      validationNameRequired: 'Пожалуйста, укажите ваше имя.',
      validationEmailRequired: 'Пожалуйста, укажите адрес электронной почты.',
      validationEmailInvalid: 'Укажите корректный формат e-mail.',
      validationMessageRequired: 'Сообщение должно содержать не менее 10 символов.',
      fallbackHelp: 'Не хотите заполнять форму? Нажмите любую ссылку ниже, чтобы сразу открыть черновик в вашей почтовой службе:',
      oneClickMail: 'Быстрый запуск почты без формы',
      formSendOptions: 'Отправить форму через выбранную почтовую службу:',
      defaultSubject: 'Вопрос по портфолио - Кандидат в разработчики',
      sendViaGmail: 'Отправить через Gmail',
      sendViaOutlook: 'Отправить через Outlook',
      sendViaMailApp: 'Отправить через почтовую программу устройства',
      draftReadyNotice: 'Сообщение подготавливается в выбранном почтовом сервисе.',
      successTitle: 'Подготовка письма',
      mailBodySender: 'Отправитель',
      mailBodyReplyTo: 'Обратный адрес',
      mailBodyPortfolio: 'Портфолио',
      copyPrefixTo: 'Кому',
      copyPrefixSubject: 'Тема',
      copyFullMessage: 'Скопировать текст обращения',
      copied: 'Скопировано!',
      copyFailed: 'Не удалось скопировать',
    },
    footer: {
      builtWith: 'Создано на Next.js (App Router), TypeScript & Tailwind CSS.',
      rights: 'Все права защищены.',
      studentNote: 'Ахметджан Баглы · Студент направления «Анализ больших данных» (Associate Degree), Университет Маниса Джелал Баяр',
      backToTop: 'Наверх',
      emailLabel: 'Эл. почта',
    },
    themes: {
      matrix: 'Matrix Кибер (Изумрудный)',
      quantum: 'Футуристический Квант (Циан)',
      gothic: 'Темный Готик Тек (Багровый)',
    },
  },
};
