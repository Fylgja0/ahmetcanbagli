'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import {
  User,
  Cpu,
  FolderGit2,
  GraduationCap,
  Target,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function HomeSectionsNavigator() {
  const { language, t } = usePortfolio();

  const PAGES = [
    {
      id: 'about',
      badge: '01_ABOUT',
      icon: User,
      href: '/about',
      title: t.nav.about,
      desc: {
        tr: 'Akademik altyapı, yazılım felsefesi ve nesne yönelimli mimari prensipleri.',
        en: 'Academic background, software engineering philosophy, and OOP principles.',
        de: 'Akademischer Werdegang, Software-Philosophie und OOP-Architekturprinzipien.',
        ru: 'Академическая база, философия разработки и принципы ООП-архитектуры.',
      },
      tags: ['MCBU', 'OOP', 'Code Quality'],
    },
    {
      id: 'skills',
      badge: '02_SKILLS',
      icon: Cpu,
      href: '/skills',
      title: t.nav.skills,
      desc: {
        tr: 'C#, .NET 10, Entity Framework Core 10, SQL Server ve Python veri bilimi yetenekleri.',
        en: 'C#, .NET 10, Entity Framework Core 10, SQL Server, and Python data science stack.',
        de: 'C#, .NET 10, EF Core 10, SQL Server und Python Data Science Technologie-Stack.',
        ru: 'Стек технологий: C#, .NET 10, EF Core 10, SQL Server и Python Data Science.',
      },
      tags: ['C#', '.NET 10', 'Python', 'SQL Server'],
    },
    {
      id: 'projects',
      badge: '03_PROJECTS',
      icon: FolderGit2,
      href: '/projects',
      title: t.nav.projects,
      desc: {
        tr: 'Car Management System ve Makine Öğrenmesi Tahmin projeleri derinlemesine mimari analizi.',
        en: 'Car Management System and ML Predictor with in-depth architectural breakdown.',
        de: 'Car Management System und ML-Vorhersage mit detaillierter Architekturanalyse.',
        ru: 'Car Management System и ML-прогнозирование с глубоким архитектурным анализом.',
      },
      tags: ['Backend', 'Data Science', 'Open Source'],
    },
    {
      id: 'education',
      badge: '04_EDUCATION',
      icon: GraduationCap,
      href: '/education',
      title: t.nav.education,
      desc: {
        tr: 'Manisa Celal Bayar Üniversitesi Büyük Veri Analitiği önlisans programı ve laboratuvar çalışmaları.',
        en: 'Manisa Celal Bayar University Big Data Analytics associate degree curriculum and labs.',
        de: 'Manisa Celal Bayar Universität Big Data Analytics Studiengang und Laborpraxis.',
        ru: 'Программа «Анализ больших данных» в Университете Маниса Джелал Баяр и лабораторные работы.',
      },
      tags: ['MCBU', 'Associate Degree', 'Big Data'],
    },
    {
      id: 'focus',
      badge: '05_FOCUS',
      icon: Target,
      href: '/focus',
      title: t.nav.currentFocus,
      desc: {
        tr: 'EF Core 10, ileri seviye EDA ve modern kurumsal backend mimarileri üzerine güncel çalışmalar.',
        en: 'Active investigations into EF Core 10, advanced EDA, and enterprise backend architectures.',
        de: 'Aktuelle Schwerpunkte in EF Core 10, EDA-Verfahren und modernen Backend-Architekturen.',
        ru: 'Текущие исследования в EF Core 10, продвинутом EDA и современных архитектурах бэкенда.',
      },
      tags: ['EF Core 10', 'CatBoost', 'EDA'],
    },
    {
      id: 'contact',
      badge: '06_CONTACT',
      icon: Mail,
      href: '/contact',
      title: t.nav.contact,
      desc: {
        tr: 'Doğrudan e-posta taslağı oluşturucu, profesyonel kanallar ve staj olanakları için iletişim.',
        en: 'Interactive email draft builder, professional social profiles, and internship outreach.',
        de: 'Interaktiver E-Mail-Entwurf-Generator, berufliche Profile und Kontakt für Praktika.',
        ru: 'Интерактивный генератор писем, профессиональные контакты и открытость к стажировкам.',
      },
      tags: ['Email', 'GitHub', 'LinkedIn'],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-xs font-mono-code text-[var(--theme-accent)] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.pageNav.explorePages}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {t.pageNav.explorePages}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mt-1">
            {t.pageNav.explorePagesSub}
          </p>
        </div>
      </div>

      {/* Grid of Page Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.id}
              href={page.href}
              className="group p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono-code text-[11px] text-[var(--theme-accent)] bg-[var(--theme-badge-bg)] px-2.5 py-0.5 rounded border border-[var(--theme-border)]">
                    {page.badge}
                  </span>
                </div>

                {/* Page Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-[var(--theme-accent)] transition-colors mb-2">
                  {page.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6 font-sans">
                  {page.desc[language]}
                </p>
              </div>

              {/* Tags & Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5 font-mono-code text-[10px]">
                  {page.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 font-mono-code text-xs font-semibold text-[var(--theme-accent)] group-hover:translate-x-1 transition-transform">
                  <span>{t.pageNav.goToPage}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
