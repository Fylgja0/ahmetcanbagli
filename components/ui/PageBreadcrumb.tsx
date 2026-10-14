'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import { ArrowLeft, ArrowRight, Home, Terminal } from 'lucide-react';

interface PageBreadcrumbProps {
  currentPage: string;
  badge: string;
  prevPage?: {
    href: string;
    label: string;
  };
  nextPage?: {
    href: string;
    label: string;
  };
}

export function PageBreadcrumb({ currentPage, badge, prevPage, nextPage }: PageBreadcrumbProps) {
  const { t } = usePortfolio();

  return (
    <div className="pt-6 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/60 hover:text-[var(--theme-accent)] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span>{t.nav.home}</span>
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-[var(--theme-accent)] font-semibold flex items-center gap-1">
            <Terminal className="w-3 h-3" />
            <span>{currentPage}</span>
          </span>
          <span className="text-white/30 hidden sm:inline">·</span>
          <span className="text-[10px] text-white/40 hidden sm:inline">{badge}</span>
        </div>

        <div className="flex items-center gap-2">
          {prevPage && (
            <Link
              href={prevPage.href}
              className="hidden sm:inline-flex items-center gap-1.5 text-white/70 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-[var(--theme-accent)] transition-colors bg-[var(--theme-card)]"
            >
              <ArrowLeft className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>{prevPage.label}</span>
            </Link>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-[var(--theme-accent)] transition-colors bg-[var(--theme-card)]"
          >
            <ArrowLeft className="w-3 h-3 text-[var(--theme-accent)] sm:hidden" />
            <span>{t.pageNav.backToHome}</span>
          </Link>
          {nextPage && (
            <Link
              href={nextPage.href}
              className="inline-flex items-center gap-1.5 text-[var(--theme-accent)] hover:text-white px-2.5 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:bg-[var(--theme-badge-bg)] transition-colors"
            >
              <span>{nextPage.label}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
