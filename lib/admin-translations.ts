import { LanguageId } from '@/types/portfolio';

export interface AdminTranslations {
  layout: {
    title: string;
    adminPortal: string;
    adminMenu: string;
    sessionActive: string;
    signOut: string;
    backToDashboard: string;
    backToPortfolio: string;
    tabs: {
      dashboard: string;
      awards: string;
      projects: string;
      messages: string;
      sessions: string;
      liveAwards: string;
    };
  };
  dashboard: {
    pageTitle: string;
    pageSubtitle: (email: string) => string;
    awardsCard: {
      title: string;
      table: string;
      manage: string;
      hide: string;
      show: string;
      hideTitle: string;
      showTitle: string;
    };
    projectsCard: {
      title: string;
      table: string;
      manage: string;
    };
    messagesCard: {
      title: string;
      totalSuffix: string;
      table: string;
      manage: string;
    };
    sessionsCard: {
      title: string;
      timeoutNotice: string;
      manage: string;
    };
    securityCard: {
      title: string;
      item1: string;
      item2: string;
      item3: string;
    };
    privacyCard: {
      title: string;
      item1: string;
      item2: string;
      item3: string;
    };
  };
  awards: {
    title: string;
    subtitle: string;
    totalCount: (count: number) => string;
    visibility: {
      liveStatus: string;
      hiddenStatus: string;
      scopeLabel: string;
      liveDesc: string;
      hiddenDesc: string;
      hideButton: string;
      publishButton: string;
    };
    form: {
      addTitle: string;
      editTitle: (id: number) => string;
      cancelEdit: string;
      nameLabel: string;
      namePlaceholder: string;
      categoryLabel: string;
      categoryEmpty: string;
      orgLabel: string;
      orgPlaceholder: string;
      dateLabel: string;
      rankLabel: string;
      rankPlaceholder: string;
      descLabel: string;
      descPlaceholder: string;
      saveButton: string;
      createButton: string;
      cancel: string;
    };
    table: {
      title: string;
      note: string;
      colId: string;
      colTitle: string;
      colCategory: string;
      colInstitution: string;
      colDate: string;
      colRank: string;
      colStatus: string;
      colActions: string;
      empty: string;
      statusPublished: string;
      statusDraft: string;
      toggleDraft: string;
      togglePublish: string;
      editTooltip: string;
      deleteTooltip: string;
      firstPlace: string;
      rankSuffix: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    totalCount: (count: number) => string;
    form: {
      addTitle: string;
      editTitle: (id: number) => string;
      cancelEdit: string;
      titleLabel: string;
      titlePlaceholder: string;
      categoryLabel: string;
      catBackend: string;
      catDataScience: string;
      catFullStack: string;
      catMobile: string;
      githubLabel: string;
      githubPlaceholder: string;
      demoLabel: string;
      demoPlaceholder: string;
      techLabel: string;
      techPlaceholder: string;
      summaryLabel: string;
      summaryPlaceholder: string;
      detailLabel: string;
      detailPlaceholder: string;
      orderLabel: string;
      featuredLabel: string;
      saveButton: string;
      createButton: string;
      cancel: string;
    };
    table: {
      title: string;
      note: string;
      colId: string;
      colTitle: string;
      colCategory: string;
      colTech: string;
      colLinks: string;
      colFeatured: string;
      colStatus: string;
      colActions: string;
      empty: string;
      statusPublished: string;
      statusDraft: string;
      toggleDraft: string;
      togglePublish: string;
      featureAdd: string;
      featureRemove: string;
      editTooltip: string;
      deleteTooltip: string;
    };
  };
  messages: {
    title: string;
    subtitle: string;
    stats: (total: number, unread: number) => string;
    anonymizeButton: string;
    anonymizeTooltip: string;
    privacyBannerTitle: string;
    privacyBannerDesc: string;
    recentAuditsTitle: string;
    auditItem: (id: number, count: number) => string;
    empty: string;
    badgeAnonymized: string;
    badgeConsent: string;
    badgeNew: string;
    messageId: (id: number) => string;
    markRead: string;
    delete: string;
  };
  sessions: {
    title: string;
    subtitle: string;
    purgeExpired: string;
    purgeTooltip: string;
    revokeOthers: string;
    protocolsTitle: string;
    proto1Title: string;
    proto1Desc: string;
    proto2Title: string;
    proto2Desc: string;
    proto3Title: string;
    proto3Desc: string;
    tableTitle: (count: number) => string;
    cookieNote: string;
    colDevice: string;
    colLastActivity: string;
    colExpires: string;
    colStatus: string;
    currentDevice: string;
    otherSession: string;
    unknownClient: string;
  };
  login: {
    backToPortfolio: string;
    badgeTitle: string;
    badgeSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    submitButton: string;
    footerNote: string;
    errorInvalidCredentials: string;
    errorRateLimited: string;
    errorTemporarilyUnavailable: string;
  };
}

export const adminTranslations: Record<LanguageId, AdminTranslations> = {
  tr: {
    layout: {
      title: 'YÖNETİCİ KONTROL PANELİ',
      adminPortal: 'YÖNETİCİ PORTALİ',
      adminMenu: 'YÖNETİCİ MENÜSÜ',
      sessionActive: '● Aktif Oturum (30 dk zaman aşımı)',
      signOut: 'Güvenli Çıkış',
      backToDashboard: '← Kontrol Paneline Dön',
      backToPortfolio: 'Portfolyoya Dön',
      tabs: {
        dashboard: 'Genel Bakış & İstatistik',
        awards: 'Ödüller & Başarılar',
        projects: 'Projeler',
        messages: 'Gelen Mesajlar',
        sessions: 'Aktif Oturumlar',
        liveAwards: 'Canlı Ödüller Sayfasını Gör ↗',
      },
    },
    dashboard: {
      pageTitle: 'Sistem Genel Bakış & Kontrol Merkezi',
      pageSubtitle: (email: string) => `Tekrar hoş geldiniz, ${email}. Portfolyo veritabanı durumu ve yönetim metrikleri.`,
      awardsCard: {
        title: 'Ödüller & Başarılar',
        table: 'oduller tablosu',
        manage: 'Yönet & Ekle',
        hide: 'Gizle',
        show: 'Göster',
        hideTitle: 'Ana Siteden Gizle',
        showTitle: 'Ana Sitede Göster',
      },
      projectsCard: {
        title: 'Projeler',
        table: 'projeler tablosu',
        manage: 'Projeleri Yönet',
      },
      messagesCard: {
        title: 'Okunmamış Mesajlar',
        totalSuffix: 'toplam',
        table: 'iletisim_mesajlari tablosu',
        manage: 'Gelen Kutusunu Aç',
      },
      sessionsCard: {
        title: 'Aktif Oturumlar',
        timeoutNotice: '30 dk zaman aşımı',
        manage: 'İncele',
      },
      securityCard: {
        title: 'Güvenlik & Oturum Mimarisi',
        item1: 'Oturum çerezleri httpOnly, secure ve sameSite: lax bayraklarıyla korunur.',
        item2: '30 dakikadan uzun süre hareketsiz kalan oturumlar otomatik olarak sonlandırılır.',
        item3: 'Veritabanı işlemleri etiketli şablon literalleriyle tam SQL Injection korumasına sahiptir.',
      },
      privacyCard: {
        title: 'Veri Gizliliği & KVKK/GDPR Uyumluluğu',
        item1: 'İletişim formu mesajlarına 1 yıllık veri saklama politikası uygulanır.',
        item2: 'Mesajlar bölümünde tek tıkla toplu anonimleştirme aracı mevcuttur.',
        item3: 'İmha kayıtları otomatik olarak imha_kayitlari denetim tablosuna işlenir.',
      },
    },
    awards: {
      title: 'Ödül & Başarı Yönetimi',
      subtitle: 'PostgreSQL veritabanı oduller tablosu kayıtları (odul_turleri ile ilişkili).',
      totalCount: (count: number) => `Toplam: ${count} kayıt`,
      visibility: {
        liveStatus: 'Ana Sitede Yayında (Görünür)',
        hiddenStatus: 'Ana Sitede Gizli (Yayından Kaldırıldı)',
        scopeLabel: 'Genel Site Görünürlüğü',
        liveDesc: 'Ziyaretçiler ödülleri ana sayfada (HomeAwardsTeaser ve Bölüm Kartı) ve /awards rotasında görebilir.',
        hiddenDesc: 'Ziyaretçiler bu bölümü göremez (/awards 404 döner, menüden kaldırılır). Ödülleri buradan yönetme ve önizleme yetkiniz devam eder.',
        hideButton: 'Ana Siteden Gizle',
        publishButton: 'Ana Sitede Yayınla',
      },
      form: {
        addTitle: 'Yeni Ödül / Başarı Ekle',
        editTitle: (id: number) => `Ödülü Düzenle (ID: #${id})`,
        cancelEdit: 'Düzenlemeyi İptal Et',
        nameLabel: 'Ödül / Başarı Başlığı *',
        namePlaceholder: 'Örn: Ulusal Hackathon 1.lik Ödülü',
        categoryLabel: 'Kategori',
        categoryEmpty: 'Kategori Seçilmedi',
        orgLabel: 'Veren Kurum / Organizasyon',
        orgPlaceholder: 'Örn: TÜBİTAK, IEEE, Üniversite',
        dateLabel: 'Tarih',
        rankLabel: 'Derece / Sıralama (Sayısal)',
        rankPlaceholder: 'Örn: 1 (1.lik)',
        descLabel: 'Detaylı Açıklama',
        descPlaceholder: 'Yarışma, proje kapsamı ve başarı hakkında detaylar...',
        saveButton: 'Değişiklikleri Kaydet (UPDATE)',
        createButton: 'Ödül Oluştur (INSERT)',
        cancel: 'İptal',
      },
      table: {
        title: 'Mevcut Ödül & Başarı Kayıtları',
        note: 'Yalnızca "Yayında" olan kayıtlar sitede ziyaretçilere gösterilir',
        colId: 'ID',
        colTitle: 'Ödül Başlığı',
        colCategory: 'Kategori',
        colInstitution: 'Kurum',
        colDate: 'Tarih',
        colRank: 'Derece',
        colStatus: 'Durum',
        colActions: 'İşlemler',
        empty: 'Henüz kayıtlı ödül bulunmuyor. Yukarıdaki formu kullanarak ilk kaydı ekleyebilirsiniz.',
        statusPublished: 'Yayında',
        statusDraft: 'Taslak',
        toggleDraft: 'Taslağa al',
        togglePublish: 'Yayınla',
        editTooltip: 'Düzenle',
        deleteTooltip: 'Sil',
        firstPlace: '🥇 1.',
        rankSuffix: '.',
      },
    },
    projects: {
      title: 'Proje Yönetimi',
      subtitle: 'PostgreSQL veritabanı projeler tablosu kayıtları. Yeni eklenen projeler hemen sitede görünür.',
      totalCount: (count: number) => `Toplam: ${count} proje`,
      form: {
        addTitle: 'Yeni Proje Ekle',
        editTitle: (id: number) => `Projeyi Düzenle (ID: #${id})`,
        cancelEdit: 'Düzenlemeyi İptal Et',
        titleLabel: 'Proje Başlığı *',
        titlePlaceholder: 'Örn: Araç Yönetim Sistemi',
        categoryLabel: 'Kategori',
        catBackend: 'Backend & Veritabanı',
        catDataScience: 'Veri Bilimi & ML',
        catFullStack: 'Full Stack & Web',
        catMobile: 'Mobil & Sistem',
        githubLabel: 'GitHub Depo URL',
        githubPlaceholder: 'https://github.com/Fylgja0/proje-adi',
        demoLabel: 'Canlı Demo URL (Opsiyonel)',
        demoPlaceholder: 'https://demo.ornek.com',
        techLabel: 'Kullanılan Teknolojiler (Virgülle ayırın)',
        techPlaceholder: 'Örn: C#, .NET 10, EF Core 10, SQL Server',
        summaryLabel: 'Kısa Özet (Slogan) *',
        summaryPlaceholder: 'Projenin temel amacını ve mühendislik etkisini özetleyen 1-2 cümle',
        detailLabel: 'Detaylı Mimari & Genel Bakış',
        detailPlaceholder: 'Mimari katmanlar, algoritmalar, varlık modelleri, veritabanı şemaları...',
        orderLabel: 'Görüntüleme Sırası (Küçük sayılar önce listelenir)',
        featuredLabel: 'Bu projeyi Öne Çıkanlar Vitrininde sergile',
        saveButton: 'Projeyi Güncelle (UPDATE)',
        createButton: 'Proje Oluştur (INSERT)',
        cancel: 'İptal',
      },
      table: {
        title: 'Mevcut Projeler Listesi',
        note: 'Yalnızca "Yayında" olan projeler ziyaretçilere görünür',
        colId: 'ID',
        colTitle: 'Proje Başlığı',
        colCategory: 'Kategori',
        colTech: 'Teknolojiler',
        colLinks: 'Bağlantılar',
        colFeatured: 'Öne Çıkan',
        colStatus: 'Durum',
        colActions: 'İşlemler',
        empty: 'Veritabanında henüz kayıtlı proje yok. Yukarıdan ilk projenizi ekleyebilirsiniz.',
        statusPublished: 'Yayında',
        statusDraft: 'Taslak',
        toggleDraft: 'Yayından Kaldır',
        togglePublish: 'Yayınla',
        featureAdd: 'Öne Çıkar',
        featureRemove: 'Öne çıkanlardan kaldır',
        editTooltip: 'Düzenle',
        deleteTooltip: 'Sil',
      },
    },
    messages: {
      title: 'Gelen İletişim Mesajları',
      subtitle: 'Portfolyo iletişim formu üzerinden iletilen mesajlar (iletisim_mesajlari tablosu).',
      stats: (total: number, unread: number) => `Toplam: ${total} | Okunmamış: ${unread}`,
      anonymizeButton: 'Süresi Dolan Mesajları Anonimleştir (> 1 Yıl)',
      anonymizeTooltip: 'Veri saklama yönetmeliğine uygun olarak 1 yıldan eski mesajları anonimleştir',
      privacyBannerTitle: 'Veri Gizliliği & Saklama Politikası Durumu',
      privacyBannerDesc: 'İletişim formu aracılığıyla toplanan kişisel veriler en fazla 1 yıl süreyle saklanır. Süresi dolan mesajlar anonimleştirme işlemiyle kişisel kimlik bilgilerinden arındırılır ve işlem adedi imha_kayitlari tablosuna kaydedilir.',
      recentAuditsTitle: 'Son Anonimleştirme Denetim Kayıtları:',
      auditItem: (id: number, count: number) => `Denetim #${id}: ${count} kayıt başarıyla anonimleştirildi.`,
      empty: 'Henüz iletilen iletişim mesajı bulunmuyor.',
      badgeAnonymized: 'Anonim Veri',
      badgeConsent: 'Rıza Onaylandı',
      badgeNew: 'Yeni',
      messageId: (id: number) => `Mesaj ID: #${id}`,
      markRead: 'Okundu İşaretle',
      delete: 'Sil',
    },
    sessions: {
      title: 'Aktif Oturum Yönetimi',
      subtitle: 'Yönetici kimlik bilgilerinizle oturum açılmış tarayıcı oturumları ve cihazlar.',
      purgeExpired: 'Süresi Dolanları Temizle',
      purgeTooltip: 'Süresi dolmuş veya 30 dakikadan uzun süredir hareketsiz olan oturumları temizle',
      revokeOthers: 'Diğer Tüm Oturumları Kapat',
      protocolsTitle: 'Güvenlik Protokolleri & Uygulama',
      proto1Title: '1. Hareketsizlik Zaman Aşımı',
      proto1Desc: 'Her etkileşim son_aktivite zaman damgasını günceller. 30 dakika hareketsiz kalan oturumlar sonlandırılır.',
      proto2Title: '2. Maksimum Süre',
      proto2Desc: 'Oturum çerezi ve veritabanı yetkilendirmesi 2 saatlik kesin sınırdan sonra sona erer.',
      proto3Title: '3. İstemci Parmak İzi',
      proto3Desc: 'Kimlik doğrulama sırasında kullanıcı tarayıcı bilgisi (User-Agent) doğrulanır ve kaydedilir.',
      tableTitle: (count: number) => `Yetkilendirilmiş Oturumlar (${count})`,
      cookieNote: 'Çerez: admin_token (httpOnly, secure, sameSite)',
      colDevice: 'Cihaz / İstemci Tarayıcısı',
      colLastActivity: 'Son Aktivite (30 dk zaman aşımı)',
      colExpires: 'Bitiş Tarihi',
      colStatus: 'Durum',
      currentDevice: 'Mevcut Cihaz',
      otherSession: 'Diğer Oturum',
      unknownClient: 'Tanımlanamayan İstemci',
    },
    login: {
      backToPortfolio: '← Portfolyoya Dön',
      badgeTitle: 'Yönetici Portalı Girişi',
      badgeSubtitle: 'Güvenlik & Yönetim Kontrol Paneli',
      emailLabel: 'Yönetici E-posta',
      passwordLabel: 'Yönetici Şifre',
      emailPlaceholder: 'yonetici@ornek.com',
      passwordPlaceholder: '••••••••••••',
      submitButton: 'Panele Giriş Yap',
      footerNote: '2 saatlik oturum süresi • 30 dk hareketsizlik zaman aşımı • bcrypt şifreleme',
      errorInvalidCredentials: 'Geçersiz e-posta adresi veya şifre.',
      errorRateLimited: 'Çok fazla başarısız giriş denemesi yapıldı. Lütfen 15 dakika sonra tekrar deneyin.',
      errorTemporarilyUnavailable: 'Giriş hizmeti geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.',
    },
  },

  en: {
    layout: {
      title: 'ADMIN CONTROL PANEL',
      adminPortal: 'ADMIN PORTAL',
      adminMenu: 'ADMIN MENU',
      sessionActive: '● Active Session (30 min timeout)',
      signOut: 'Sign Out',
      backToDashboard: '← Back to Dashboard',
      backToPortfolio: 'Back to Portfolio',
      tabs: {
        dashboard: 'Dashboard & Overview',
        awards: 'Awards & Honors',
        projects: 'Projects',
        messages: 'Inbox Messages',
        sessions: 'Active Sessions',
        liveAwards: 'View Live Awards Page ↗',
      },
    },
    dashboard: {
      pageTitle: 'System Overview & Control Panel',
      pageSubtitle: (email: string) => `Welcome back, ${email}. Portfolio database status and management metrics.`,
      awardsCard: {
        title: 'Awards & Honors',
        table: 'oduller table',
        manage: 'Manage & Add',
        hide: 'Hide',
        show: 'Show',
        hideTitle: 'Hide from Main Site',
        showTitle: 'Show on Main Site',
      },
      projectsCard: {
        title: 'Projects',
        table: 'projeler table',
        manage: 'Manage Projects',
      },
      messagesCard: {
        title: 'Unread Messages',
        totalSuffix: 'total',
        table: 'iletisim_mesajlari table',
        manage: 'Open Inbox',
      },
      sessionsCard: {
        title: 'Active Sessions',
        timeoutNotice: '30 min timeout',
        manage: 'Inspect',
      },
      securityCard: {
        title: 'Security & Session Architecture',
        item1: 'Session cookies protected with httpOnly, secure, and sameSite: lax flags.',
        item2: 'Sessions inactive for more than 30 minutes are invalidated automatically.',
        item3: 'Database operations utilize tagged template literals for guaranteed SQL injection protection.',
      },
      privacyCard: {
        title: 'Data Privacy & GDPR/KVKK Compliance',
        item1: '1-year data retention schedule applied to contact form submissions.',
        item2: '1-click batch anonymization tool available in the Messages section.',
        item3: 'Purge audit trail automatically recorded into the imha_kayitlari table.',
      },
    },
    awards: {
      title: 'Awards & Honors Management',
      subtitle: 'PostgreSQL database records from oduller table (joined with odul_turleri).',
      totalCount: (count: number) => `Total: ${count} records`,
      visibility: {
        liveStatus: 'Live on Main Site (Visible)',
        hiddenStatus: 'Hidden from Main Site (Unpublished)',
        scopeLabel: 'Global Site Visibility',
        liveDesc: 'Visitors can see the awards on the home page (HomeAwardsTeaser and Section Card) and on the /awards route.',
        hiddenDesc: 'Visitors cannot see this section (/awards returns 404, removed from navigation). You retain full control to manage and preview awards here.',
        hideButton: 'Hide from Main Site',
        publishButton: 'Publish to Main Site',
      },
      form: {
        addTitle: 'Add New Award / Honor',
        editTitle: (id: number) => `Edit Award (ID: #${id})`,
        cancelEdit: 'Cancel Editing',
        nameLabel: 'Award / Honor Title *',
        namePlaceholder: 'e.g. National Hackathon 1st Place Award',
        categoryLabel: 'Category',
        categoryEmpty: 'No Category Selected',
        orgLabel: 'Awarding Organization / Institution',
        orgPlaceholder: 'e.g. TUBITAK, IEEE, University',
        dateLabel: 'Date',
        rankLabel: 'Rank / Placement (Numeric)',
        rankPlaceholder: 'e.g. 1 (1st place)',
        descLabel: 'Detailed Description',
        descPlaceholder: 'Details about the competition, project scope, achievement highlights...',
        saveButton: 'Save Changes (UPDATE)',
        createButton: 'Create Award (INSERT)',
        cancel: 'Cancel',
      },
      table: {
        title: 'Existing Award & Honor Records',
        note: 'Only "Published" records are shown on public site',
        colId: 'ID',
        colTitle: 'Award Title',
        colCategory: 'Category',
        colInstitution: 'Institution',
        colDate: 'Date',
        colRank: 'Rank',
        colStatus: 'Status',
        colActions: 'Actions',
        empty: 'No registered awards yet. You can add the first entry using the form above.',
        statusPublished: 'Published',
        statusDraft: 'Draft',
        toggleDraft: 'Set to draft',
        togglePublish: 'Publish',
        editTooltip: 'Edit',
        deleteTooltip: 'Delete',
        firstPlace: '🥇 1st',
        rankSuffix: 'th',
      },
    },
    projects: {
      title: 'Projects Management',
      subtitle: 'PostgreSQL database records from projeler table. Newly added projects appear immediately.',
      totalCount: (count: number) => `Total: ${count} projects`,
      form: {
        addTitle: 'Add New Project',
        editTitle: (id: number) => `Edit Project (ID: #${id})`,
        cancelEdit: 'Cancel Editing',
        titleLabel: 'Project Title *',
        titlePlaceholder: 'e.g. Car Management System',
        categoryLabel: 'Category',
        catBackend: 'Backend & Database',
        catDataScience: 'Data Science & ML',
        catFullStack: 'Full Stack & Web',
        catMobile: 'Mobile & Systems',
        githubLabel: 'GitHub Repository URL',
        githubPlaceholder: 'https://github.com/Fylgja0/project-name',
        demoLabel: 'Live Deployment URL (Optional)',
        demoPlaceholder: 'https://demo.example.com',
        techLabel: 'Technologies Used (Comma separated)',
        techPlaceholder: 'e.g. C#, .NET 10, EF Core 10, SQL Server',
        summaryLabel: 'Short Summary (Tagline) *',
        summaryPlaceholder: '1-2 sentences summarizing the core purpose and engineering impact',
        detailLabel: 'Detailed Overview & Architecture',
        detailPlaceholder: 'Architecture layers, algorithms, entity models, database schemas...',
        orderLabel: 'Display Order (Lower values appear first)',
        featuredLabel: 'Feature this project in Featured Showcase',
        saveButton: 'Update Project (UPDATE)',
        createButton: 'Create Project (INSERT)',
        cancel: 'Cancel',
      },
      table: {
        title: 'Existing Projects List',
        note: 'Only "Published" projects are visible to visitors',
        colId: 'ID',
        colTitle: 'Project Title',
        colCategory: 'Category',
        colTech: 'Technologies',
        colLinks: 'Links',
        colFeatured: 'Featured',
        colStatus: 'Status',
        colActions: 'Actions',
        empty: 'No projects recorded in the database yet. You can add your first project above.',
        statusPublished: 'Published',
        statusDraft: 'Draft',
        toggleDraft: 'Unpublish',
        togglePublish: 'Publish',
        featureAdd: 'Feature',
        featureRemove: 'Remove from featured',
        editTooltip: 'Edit',
        deleteTooltip: 'Delete',
      },
    },
    messages: {
      title: 'Inbox Contact Messages',
      subtitle: 'Messages submitted via the portfolio contact form (stored in iletisim_mesajlari table).',
      stats: (total: number, unread: number) => `Total: ${total} | Unread: ${unread}`,
      anonymizeButton: 'Anonymize Expired Messages (> 1 Year)',
      anonymizeTooltip: 'Anonymize messages older than 1 year according to data protection retention regulations',
      privacyBannerTitle: 'Data Privacy & Retention Policy Status',
      privacyBannerDesc: 'Personal data collected via the contact form is retained for a maximum duration of 1 year. Messages past retention are stripped of personal identifiers upon clicking the anonymize action, and the operation count is persisted into the imha_kayitlari audit log table.',
      recentAuditsTitle: 'Recent Anonymization Audit Logs:',
      auditItem: (id: number, count: number) => `Audit #${id}: ${count} records successfully anonymized.`,
      empty: 'No contact messages received yet.',
      badgeAnonymized: 'Anonymized Data',
      badgeConsent: 'Consent Verified',
      badgeNew: 'New',
      messageId: (id: number) => `Message ID: #${id}`,
      markRead: 'Mark as Read',
      delete: 'Delete',
    },
    sessions: {
      title: 'Active Session Management',
      subtitle: 'Browser sessions and devices authenticated with your administrator credentials.',
      purgeExpired: 'Purge Expired',
      purgeTooltip: 'Purge sessions that are expired or inactive for more than 30 minutes',
      revokeOthers: 'Revoke All Other Sessions',
      protocolsTitle: 'Security Protocols & Enforcement',
      proto1Title: '1. Inactivity Timeout',
      proto1Desc: 'Every interaction updates son_aktivite timestamp. Inactive sessions terminate after 30 minutes.',
      proto2Title: '2. Maximum Lifetime'
      , proto2Desc: 'The session cookie and database authorization expire after a hard limit of 2 hours.',
      proto3Title: '3. Client Fingerprinting',
      proto3Desc: 'The client User-Agent header is verified and recorded upon authentication to detect anomalies.',
      tableTitle: (count: number) => `Authenticated Sessions (${count})`,
      cookieNote: 'Cookie: admin_token (httpOnly, secure, sameSite)',
      colDevice: 'Device / Client User-Agent',
      colLastActivity: 'Last Activity (30m timeout)',
      colExpires: 'Expires At',
      colStatus: 'Status',
      currentDevice: 'Current Device',
      otherSession: 'Other Session',
      unknownClient: 'Unidentified Client',
    },
    login: {
      backToPortfolio: '← Back to Portfolio',
      badgeTitle: 'Admin Portal Login',
      badgeSubtitle: 'Security & Administrative Control Panel',
      emailLabel: 'Admin Email',
      passwordLabel: 'Admin Password',
      emailPlaceholder: 'admin@example.com',
      passwordPlaceholder: '••••••••••••',
      submitButton: 'Sign In to Dashboard',
      footerNote: '2-hour session lifetime • 30-min inactivity timeout • bcrypt cryptographic hashing',
      errorInvalidCredentials: 'Invalid email address or password.',
      errorRateLimited: 'Too many failed login attempts. Please try again in 15 minutes.',
      errorTemporarilyUnavailable: 'Sign-in service is temporarily unavailable. Please try again later.',
    },
  },

  de: {
    layout: {
      title: 'ADMIN-KONTROLLPANEL',
      adminPortal: 'ADMIN-PORTAL',
      adminMenu: 'ADMIN-MENÜ',
      sessionActive: '● Aktive Sitzung (30 Min. Timeout)',
      signOut: 'Abmelden',
      backToDashboard: '← Zurück zum Dashboard',
      backToPortfolio: 'Zurück zum Portfolio',
      tabs: {
        dashboard: 'Übersicht & Dashboard',
        awards: 'Auszeichnungen & Erfolge',
        projects: 'Projekte',
        messages: 'Posteingang',
        sessions: 'Aktive Sitzungen',
        liveAwards: 'Live-Auszeichnungsseite ansehen ↗',
      },
    },
    dashboard: {
      pageTitle: 'Systemübersicht & Kontrollzentrum',
      pageSubtitle: (email: string) => `Willkommen zurück, ${email}. Status der Portfolio-Datenbank und Verwaltungsmetriken.`,
      awardsCard: {
        title: 'Auszeichnungen & Erfolge',
        table: 'Tabelle oduller',
        manage: 'Verwalten & Hinzufügen',
        hide: 'Ausblenden',
        show: 'Einblenden',
        hideTitle: 'Auf Hauptseite ausblenden',
        showTitle: 'Auf Hauptseite anzeigen',
      },
      projectsCard: {
        title: 'Projekte',
        table: 'Tabelle projeler',
        manage: 'Projekte verwalten',
      },
      messagesCard: {
        title: 'Ungelesene Nachrichten',
        totalSuffix: 'gesamt',
        table: 'Tabelle iletisim_mesajlari',
        manage: 'Posteingang öffnen',
      },
      sessionsCard: {
        title: 'Aktive Sitzungen',
        timeoutNotice: '30 Min. Timeout',
        manage: 'Prüfen',
      },
      securityCard: {
        title: 'Sicherheits- & Sitzungsarchitektur',
        item1: 'Sitzungscookies geschützt mit httpOnly-, secure- und sameSite: lax-Flags.',
        item2: 'Sitzungen, die länger als 30 Minuten inaktiv sind, werden automatisch beendet.',
        item3: 'Datenbankoperationen nutzen getaggte Template-Literale für garantierten Schutz vor SQL-Injektionen.',
      },
      privacyCard: {
        title: 'Datenschutz & DSGVO/KVKK-Konformität',
        item1: '1-jährige Aufbewahrungsfrist für Kontaktformular-Einsendungen.',
        item2: '1-Klick-Stapel-Anonymisierung im Nachrichtenbereich verfügbar.',
        item3: 'Löschprotokolle werden automatisch in der Audit-Tabelle imha_kayitlari erfasst.',
      },
    },
    awards: {
      title: 'Verwaltung von Auszeichnungen & Erfolgen',
      subtitle: 'PostgreSQL-Datenbankeinträge aus der Tabelle oduller (verknüpft mit odul_turleri).',
      totalCount: (count: number) => `Gesamt: ${count} Einträge`,
      visibility: {
        liveStatus: 'Auf Hauptseite live (Sichtbar)',
        hiddenStatus: 'Auf Hauptseite verborgen (Nicht veröffentlicht)',
        scopeLabel: 'Globale Sichtbarkeit der Website',
        liveDesc: 'Besucher können Auszeichnungen auf der Startseite und unter der Route /awards einsehen.',
        hiddenDesc: 'Besucher können diesen Bereich nicht sehen (/awards gibt 404 zurück). Sie behalten hier die volle Kontrolle zum Verwalten und Voranzeigen.',
        hideButton: 'Auf Hauptseite verbergen',
        publishButton: 'Auf Hauptseite veröffentlichen',
      },
      form: {
        addTitle: 'Neue Auszeichnung / Erfolg hinzufügen',
        editTitle: (id: number) => `Auszeichnung bearbeiten (ID: #${id})`,
        cancelEdit: 'Bearbeitung abbrechen',
        nameLabel: 'Titel der Auszeichnung *',
        namePlaceholder: 'z. B. 1. Platz beim Nationalen Hackathon',
        categoryLabel: 'Kategorie',
        categoryEmpty: 'Keine Kategorie ausgewählt',
        orgLabel: 'Verleihende Organisation / Institution',
        orgPlaceholder: 'z. B. TÜBİTAK, IEEE, Universität',
        dateLabel: 'Datum',
        rankLabel: 'Platzierung / Rang (Numerisch)',
        rankPlaceholder: 'z. B. 1 (1. Platz)',
        descLabel: 'Detaillierte Beschreibung',
        descPlaceholder: 'Details zum Wettbewerb, Projektumfang und Highlights...',
        saveButton: 'Änderungen speichern (UPDATE)',
        createButton: 'Auszeichnung erstellen (INSERT)',
        cancel: 'Abbrechen',
      },
      table: {
        title: 'Bestehende Auszeichnungen & Erfolge',
        note: 'Nur als „Veröffentlicht“ markierte Einträge sind öffentlich sichtbar',
        colId: 'ID',
        colTitle: 'Titel der Auszeichnung',
        colCategory: 'Kategorie',
        colInstitution: 'Institution',
        colDate: 'Datum',
        colRank: 'Rang',
        colStatus: 'Status',
        colActions: 'Aktionen',
        empty: 'Noch keine Auszeichnungen registriert. Sie können oben den ersten Eintrag anlegen.',
        statusPublished: 'Veröffentlicht',
        statusDraft: 'Entwurf',
        toggleDraft: 'Als Entwurf setzen',
        togglePublish: 'Veröffentlichen',
        editTooltip: 'Bearbeiten',
        deleteTooltip: 'Löschen',
        firstPlace: '🥇 1.',
        rankSuffix: '.',
      },
    },
    projects: {
      title: 'Projektverwaltung',
      subtitle: 'PostgreSQL-Datenbankeinträge aus der Tabelle projeler. Neu hinzugefügte Projekte erscheinen sofort.',
      totalCount: (count: number) => `Gesamt: ${count} Projekte`,
      form: {
        addTitle: 'Neues Projekt hinzufügen',
        editTitle: (id: number) => `Projekt bearbeiten (ID: #${id})`,
        cancelEdit: 'Bearbeitung abbrechen',
        titleLabel: 'Projekttitel *',
        titlePlaceholder: 'z. B. Car Management System',
        categoryLabel: 'Kategorie',
        catBackend: 'Backend & Datenbank',
        catDataScience: 'Data Science & ML',
        catFullStack: 'Full Stack & Web',
        catMobile: 'Mobile & Systeme',
        githubLabel: 'GitHub-Repository-URL',
        githubPlaceholder: 'https://github.com/Fylgja0/projekt-name',
        demoLabel: 'Live-Demo-URL (Optional)',
        demoPlaceholder: 'https://demo.example.com',
        techLabel: 'Verwendete Technologien (kommagetrennt)',
        techPlaceholder: 'z. B. C#, .NET 10, EF Core 10, SQL Server',
        summaryLabel: 'Kurzbeschreibung (Tagline) *',
        summaryPlaceholder: '1-2 Sätze, die den Kernzweck und die technische Wirkung zusammenfassen',
        detailLabel: 'Detaillierte Übersicht & Architektur',
        detailPlaceholder: 'Architekturschichten, Algorithmen, Datenmodelle, Datenbankschemata...',
        orderLabel: 'Anzeigereihenfolge (Kleinere Werte erscheinen zuerst)',
        featuredLabel: 'Dieses Projekt im Highlight-Showcase hervorheben',
        saveButton: 'Projekt aktualisieren (UPDATE)',
        createButton: 'Projekt erstellen (INSERT)',
        cancel: 'Abbrechen',
      },
      table: {
        title: 'Liste vorhandener Projekte',
        note: 'Nur als „Veröffentlicht“ markierte Projekte sind für Besucher sichtbar',
        colId: 'ID',
        colTitle: 'Projekttitel',
        colCategory: 'Kategorie',
        colTech: 'Technologien',
        colLinks: 'Links',
        colFeatured: 'Hervorgehoben',
        colStatus: 'Status',
        colActions: 'Aktionen',
        empty: 'Bislang keine Projekte in der Datenbank. Sie können oben das erste Projekt anlegen.',
        statusPublished: 'Veröffentlicht',
        statusDraft: 'Entwurf',
        toggleDraft: 'Veröffentlichung aufheben',
        togglePublish: 'Veröffentlichen',
        featureAdd: 'Hervorheben',
        featureRemove: 'Aus Highlights entfernen',
        editTooltip: 'Bearbeiten',
        deleteTooltip: 'Löschen',
      },
    },
    messages: {
      title: 'Posteingang Kontaktnachrichten',
      subtitle: 'Über das Portfolio-Kontaktformular eingegangene Nachrichten (Tabelle iletisim_mesajlari).',
      stats: (total: number, unread: number) => `Gesamt: ${total} | Ungelesen: ${unread}`,
      anonymizeButton: 'Abgelaufene Nachrichten anonymisieren (> 1 Jahr)',
      anonymizeTooltip: 'Nachrichten, die älter als 1 Jahr sind, gemäß Datenschutzvorschriften anonymisieren',
      privacyBannerTitle: 'Status der Datenschutz- & Aufbewahrungsrichtlinie',
      privacyBannerDesc: 'Über das Kontaktformular erhobene personenbezogene Daten werden maximal 1 Jahr aufbewahrt. Nach Ablauf werden personenbezogene Daten entfernt und der Zähler in der Audit-Tabelle imha_kayitlari gespeichert.',
      recentAuditsTitle: 'Aktuelle Anonymisierungs-Audit-Protokolle:',
      auditItem: (id: number, count: number) => `Audit #${id}: ${count} Datensätze erfolgreich anonymisiert.`,
      empty: 'Noch keine Kontaktnachrichten erhalten.',
      badgeAnonymized: 'Anonymisierte Daten',
      badgeConsent: 'Einwilligung bestätigt',
      badgeNew: 'Neu',
      messageId: (id: number) => `Nachrichten-ID: #${id}`,
      markRead: 'Als gelesen markieren',
      delete: 'Löschen',
    },
    sessions: {
      title: 'Aktive Sitzungsverwaltung',
      subtitle: 'Browsersitzungen und Geräte, die mit Ihren Administrator-Anmeldedaten authentifiziert sind.',
      purgeExpired: 'Abgelaufene bereinigen',
      purgeTooltip: 'Sitzungen bereinigen, die abgelaufen oder länger als 30 Minuten inaktiv sind',
      revokeOthers: 'Alle anderen Sitzungen widerrufen',
      protocolsTitle: 'Sicherheitsprotokolle & Durchsetzung',
      proto1Title: '1. Inaktivitäts-Timeout',
      proto1Desc: 'Jede Interaktion aktualisiert den Zeitstempel son_aktivite. Inaktive Sitzungen enden nach 30 Minuten.',
      proto2Title: '2. Maximale Lebensdauer',
      proto2Desc: 'Das Sitzungscookie und die Datenbankautorisierung laufen nach einem festen Limit von 2 Stunden ab.',
      proto3Title: '3. Client-Fingerprinting',
      proto3Desc: 'Der User-Agent des Clients wird bei der Authentifizierung überprüft und erfasst.',
      tableTitle: (count: number) => `Authentifizierte Sitzungen (${count})`,
      cookieNote: 'Cookie: admin_token (httpOnly, secure, sameSite)',
      colDevice: 'Gerät / Client-User-Agent',
      colLastActivity: 'Letzte Aktivität (30 Min. Timeout)',
      colExpires: 'Läuft ab am',
      colStatus: 'Status',
      currentDevice: 'Aktuelles Gerät',
      otherSession: 'Andere Sitzung',
      unknownClient: 'Unbekannter Client',
    },
    login: {
      backToPortfolio: '← Zurück zum Portfolio',
      badgeTitle: 'Admin-Portal-Anmeldung',
      badgeSubtitle: 'Sicherheits- & Administrations-Kontrollpanel',
      emailLabel: 'Admin-E-Mail',
      passwordLabel: 'Admin-Passwort',
      emailPlaceholder: 'admin@beispiel.de',
      passwordPlaceholder: '••••••••••••',
      submitButton: 'Im Dashboard anmelden',
      footerNote: '2 Stunden Sitzungsdauer • 30 Min. Inaktivitäts-Timeout • bcrypt-Verschlüsselung',
      errorInvalidCredentials: 'Ungültige E-Mail-Adresse oder ungültiges Passwort.',
      errorRateLimited: 'Zu viele fehlgeschlagene Anmeldeversuche. Bitte versuchen Sie es in 15 Minuten erneut.',
      errorTemporarilyUnavailable: 'Der Anmeldedienst ist vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.',
    },
  },

  ru: {
    layout: {
      title: 'ПАНЕЛЬ УПРАВЛЕНИЯ АДМИНИСТРАТОРА',
      adminPortal: 'ПОРТАЛ АДМИНИСТРАТОРА',
      adminMenu: 'МЕНЮ АДМИНИСТРАТОРА',
      sessionActive: '● Активная сессия (тайм-аут 30 мин)',
      signOut: 'Выйти',
      backToDashboard: '← Назад в панель',
      backToPortfolio: 'Вернуться в портфолио',
      tabs: {
        dashboard: 'Обзор и аналитика',
        awards: 'Награды и достижения',
        projects: 'Проекты',
        messages: 'Входящие сообщения',
        sessions: 'Активные сессии',
        liveAwards: 'Страница наград на сайте ↗',
      },
    },
    dashboard: {
      pageTitle: 'Обзор системы и центр управления',
      pageSubtitle: (email: string) => `С возвращением, ${email}. Состояние базы данных портфолио и метрики управления.`,
      awardsCard: {
        title: 'Награды и достижения',
        table: 'таблица oduller',
        manage: 'Управлять и добавить',
        hide: 'Скрыть',
        show: 'Показать',
        hideTitle: 'Скрыть с основного сайта',
        showTitle: 'Показать на основном сайте',
      },
      projectsCard: {
        title: 'Проекты',
        table: 'таблица projeler',
        manage: 'Управление проектами',
      },
      messagesCard: {
        title: 'Непрочитанные сообщения',
        totalSuffix: 'всего',
        table: 'таблица iletisim_mesajlari',
        manage: 'Открыть входящие',
      },
      sessionsCard: {
        title: 'Активные сессии',
        timeoutNotice: 'тайм-аут 30 мин',
        manage: 'Проверить',
      },
      securityCard: {
        title: 'Безопасность и архитектура сессий',
        item1: 'Куки сессии защищены флагами httpOnly, secure и sameSite: lax.',
        item2: 'Сессии, неактивные более 30 минут, аннулируются автоматически.',
        item3: 'Операции с базой данных используют тегированные шаблонные строки для надежной защиты от SQL-инъекций.',
      },
      privacyCard: {
        title: 'Конфиденциальность данных и соответствие нормам',
        item1: '1 год хранения данных применяется к обращениям через контактную форму.',
        item2: 'Инструмент пакетной анонимизации в 1 клик доступен в разделе сообщений.',
        item3: 'Аудит уничтожения данных автоматически записывается в таблицу imha_kayitlari.',
      },
    },
    awards: {
      title: 'Управление наградами и достижениями',
      subtitle: 'Записи базы данных PostgreSQL из таблицы oduller (связанной с odul_turleri).',
      totalCount: (count: number) => `Всего: ${count} записей`,
      visibility: {
        liveStatus: 'Опубликовано на сайте (Видимо)',
        hiddenStatus: 'Скрыто на сайте (Не опубликовано)',
        scopeLabel: 'Общая видимость на сайте',
        liveDesc: 'Посетители могут видеть награды на главной странице и по адресу /awards.',
        hiddenDesc: 'Посетители не видят этот раздел (/awards возвращает 404). Вы сохраняете полный контроль для управления и предпросмотра здесь.',
        hideButton: 'Скрыть с сайта',
        publishButton: 'Опубликовать на сайте',
      },
      form: {
        addTitle: 'Добавить новую награду / достижение',
        editTitle: (id: number) => `Редактировать награду (ID: #${id})`,
        cancelEdit: 'Отменить редактирование',
        nameLabel: 'Название награды / достижения *',
        namePlaceholder: 'Например: 1-е место на национальном хакатоне',
        categoryLabel: 'Категория',
        categoryEmpty: 'Категория не выбрана',
        orgLabel: 'Организация / Учреждение',
        orgPlaceholder: 'Например: TÜBİTAK, IEEE, Университет',
        dateLabel: 'Дата',
        rankLabel: 'Место / Ранг (число)',
        rankPlaceholder: 'Например: 1 (1-е место)',
        descLabel: 'Подробное описание',
        descPlaceholder: 'Подробности о конкурсе, масштабе проекта и ключевых достижениях...',
        saveButton: 'Сохранить изменения (UPDATE)',
        createButton: 'Создать награду (INSERT)',
        cancel: 'Отмена',
      },
      table: {
        title: 'Существующие записи наград',
        note: 'Только опубликованные записи отображаются для посетителей',
        colId: 'ID',
        colTitle: 'Название награды',
        colCategory: 'Категория',
        colInstitution: 'Учреждение',
        colDate: 'Дата',
        colRank: 'Место',
        colStatus: 'Статус',
        colActions: 'Действия',
        empty: 'Пока нет зарегистрированных наград. Вы можете добавить первую с помощью формы выше.',
        statusPublished: 'Опубликовано',
        statusDraft: 'Черновик',
        toggleDraft: 'В черновик',
        togglePublish: 'Опубликовать',
        editTooltip: 'Редактировать',
        deleteTooltip: 'Удалить',
        firstPlace: '🥇 1-е',
        rankSuffix: '-е',
      },
    },
    projects: {
      title: 'Управление проектами',
      subtitle: 'Записи базы данных PostgreSQL из таблицы projeler. Добавленные проекты сразу появляются на сайте.',
      totalCount: (count: number) => `Всего: ${count} проектов`,
      form: {
        addTitle: 'Добавить новый проект',
        editTitle: (id: number) => `Редактировать проект (ID: #${id})`,
        cancelEdit: 'Отменить редактирование',
        titleLabel: 'Название проекта *',
        titlePlaceholder: 'Например: Car Management System',
        categoryLabel: 'Категория',
        catBackend: 'Бэкенд и базы данных',
        catDataScience: 'Data Science и ML',
        catFullStack: 'Full Stack и веб',
        catMobile: 'Мобильные и системные',
        githubLabel: 'URL репозитория GitHub',
        githubPlaceholder: 'https://github.com/Fylgja0/project-name',
        demoLabel: 'URL демоверсии (необязательно)',
        demoPlaceholder: 'https://demo.example.com',
        techLabel: 'Используемые технологии (через запятую)',
        techPlaceholder: 'Например: C#, .NET 10, EF Core 10, SQL Server',
        summaryLabel: 'Краткое описание (слоган) *',
        summaryPlaceholder: '1-2 предложения о ключевой цели и инженерном решении',
        detailLabel: 'Подробный обзор и архитектура',
        detailPlaceholder: 'Слои архитектуры, алгоритмы, модели данных, схемы БД...',
        orderLabel: 'Порядок отображения (меньшие числа выводятся первыми)',
        featuredLabel: 'Показывать этот проект в витрине избранных',
        saveButton: 'Обновить проект (UPDATE)',
        createButton: 'Создать проект (INSERT)',
        cancel: 'Отмена',
      },
      table: {
        title: 'Список существующих проектов',
        note: 'Только опубликованные проекты видны посетителям',
        colId: 'ID',
        colTitle: 'Название проекта',
        colCategory: 'Категория',
        colTech: 'Технологии',
        colLinks: 'Ссылки',
        colFeatured: 'Избранное',
        colStatus: 'Статус',
        colActions: 'Действия',
        empty: 'В базе данных пока нет проектов. Вы можете добавить свой первый проект выше.',
        statusPublished: 'Опубликовано',
        statusDraft: 'Черновик',
        toggleDraft: 'Снять с публикации',
        togglePublish: 'Опубликовать',
        featureAdd: 'В избранное',
        featureRemove: 'Убрать из избранного',
        editTooltip: 'Редактировать',
        deleteTooltip: 'Удалить',
      },
    },
    messages: {
      title: 'Входящие контактные сообщения',
      subtitle: 'Сообщения, отправленные через контактную форму портфолио (таблица iletisim_mesajlari).',
      stats: (total: number, unread: number) => `Всего: ${total} | Непрочитанных: ${unread}`,
      anonymizeButton: 'Анонимизировать старые сообщения (> 1 года)',
      anonymizeTooltip: 'Анонимизировать сообщения старше 1 года в соответствии с политикой хранения данных',
      privacyBannerTitle: 'Статус политики конфиденциальности и хранения',
      privacyBannerDesc: 'Персональные данные, собранные через форму, хранятся не более 1 года. Устаревшие сообщения очищаются от персональных данных при запуске анонимизации, а число операций записывается в таблицу imha_kayitlari.',
      recentAuditsTitle: 'Недавние записи аудита анонимизации:',
      auditItem: (id: number, count: number) => `Аудит #${id}: успешно анонимизировано записей: ${count}.`,
      empty: 'Входящих сообщений пока нет.',
      badgeAnonymized: 'Анонимные данные',
      badgeConsent: 'Согласие подтверждено',
      badgeNew: 'Новое',
      messageId: (id: number) => `ID сообщения: #${id}`,
      markRead: 'Отметить как прочитанное',
      delete: 'Удалить',
    },
    sessions: {
      title: 'Управление активными сессиями',
      subtitle: 'Сессии браузеров и устройства, аутентифицированные с вашими учетными данными администратора.',
      purgeExpired: 'Очистить устаревшие',
      purgeTooltip: 'Удалить сессии, срок действия которых истек или неактивные более 30 минут',
      revokeOthers: 'Закрыть все остальные сессии',
      protocolsTitle: 'Протоколы безопасности и применение',
      proto1Title: '1. Тайм-аут бездействия'
      , proto1Desc: 'Каждое действие обновляет метку son_aktivite. Неактивные сессии закрываются через 30 минут.',
      proto2Title: '2. Максимальное время жизни',
      proto2Desc: 'Куки сессии и авторизация в БД истекают после жесткого лимита в 2 часа.',
      proto3Title: '3. Цифровой отпечаток клиента',
      proto3Desc: 'Заголовок User-Agent проверяется и фиксируется при аутентификации для обнаружения аномалий.',
      tableTitle: (count: number) => `Аутентифицированные сессии (${count})`,
      cookieNote: 'Куки: admin_token (httpOnly, secure, sameSite)',
      colDevice: 'Устройство / Клиент User-Agent',
      colLastActivity: 'Последняя активность (тайм-аут 30 мин)',
      colExpires: 'Истекает',
      colStatus: 'Статус',
      currentDevice: 'Текущее устройство',
      otherSession: 'Другая сессия',
      unknownClient: 'Неопознанный клиент',
    },
    login: {
      backToPortfolio: '← Вернуться в портфолио',
      badgeTitle: 'Вход в панель администратора',
      badgeSubtitle: 'Безопасность и административная панель управления',
      emailLabel: 'Email администратора',
      passwordLabel: 'Пароль администратора',
      emailPlaceholder: 'admin@example.com',
      passwordPlaceholder: '••••••••••••',
      submitButton: 'Войти в панель',
      footerNote: 'Срок сессии 2 часа • 30 мин тайм-аут бездействия • криптографическое хеширование bcrypt',
      errorInvalidCredentials: 'Неверный адрес электронной почты или пароль.',
      errorRateLimited: 'Слишком много неудачных попыток входа. Пожалуйста, повторите попытку через 15 минут.',
      errorTemporarilyUnavailable: 'Сервис входа временно недоступен. Пожалуйста, попробуйте позже.',
    },
  },
};
