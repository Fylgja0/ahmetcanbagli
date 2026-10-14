'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import { ArrowLeft, ArrowRight, Home, Terminal } from 'lucide-react';

interface PageHeaderBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  prevPage?: {
    href: string;
    label: string;
  };
  nextPage?: {
    href: string;
    label: string;
  };
}

export function PageHeaderBanner({
  badge,
  title,
  subtitle,
  prevPage,
  nextPage,
}: PageHeaderBannerProps) {
  const { t } = usePortfolio();

  return (
    <div className="pt-8 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top breadcrumb & quick back link */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-white/60">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-[var(--theme-accent)] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>{t.nav.home}</span>
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-[var(--theme-accent)] font-semibold">{badge}</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/60 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-[var(--theme-accent)] transition-colors bg-[var(--theme-card)]"
        >
          <ArrowLeft className="w-3 h-3 text-[var(--theme-accent)]" />
          <span>{t.pageNav.backToHome}</span>
        </Link>
      </div>

      {/* Page Title & Badges */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-mono-code text-xs border border-[var(--theme-border)]">
            <Terminal className="w-3 h-3" />
            <span>{badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Quick Prev / Next navigation pills */}
        {(prevPage || nextPage) && (
          <div className="flex items-center gap-2 pt-2 md:pt-0 font-mono-code text-xs">
            {prevPage && (
              <Link
                href={prevPage.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[var(--theme-card)] text-white/80 hover:text-white hover:border-[var(--theme-accent)] transition-all"
                title={prevPage.label}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                <span className="hidden sm:inline">{prevPage.label}</span>
              </Link>
            )}
            {nextPage && (
              <Link
                href={nextPage.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-accent)] font-semibold hover:bg-[var(--theme-badge-bg)] transition-all"
                title={nextPage.label}
              >
                <span className="hidden sm:inline">{nextPage.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
