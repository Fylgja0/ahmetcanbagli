'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

interface PageFooterNavigationProps {
  prevPage?: {
    href: string;
    label: string;
    badge: string;
  };
  nextPage?: {
    href: string;
    label: string;
    badge: string;
  };
}

export function PageFooterNavigation({ prevPage, nextPage }: PageFooterNavigationProps) {
  const { t } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-xs">
        {prevPage ? (
          <Link
            href={prevPage.href}
            className="w-full sm:w-auto group flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all"
          >
            <div className="p-2 rounded bg-[var(--theme-surface)] text-[var(--theme-accent)] group-hover:-translate-x-1 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-white/40 uppercase">{t.pageNav.prevPage}</div>
              <div className="text-white font-semibold group-hover:text-[var(--theme-accent)] transition-colors">
                {prevPage.label}
              </div>
            </div>
          </Link>
        ) : (
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 text-[var(--theme-accent)]" />
            <span>{t.pageNav.backToHome}</span>
          </Link>
        )}

        <Link
          href="/"
          className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--theme-border)] text-white/70 hover:text-white hover:border-[var(--theme-accent)] bg-[var(--theme-surface)] transition-all"
        >
          <Home className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          <span>{t.pageNav.backToHome}</span>
        </Link>

        {nextPage ? (
          <Link
            href={nextPage.href}
            className="w-full sm:w-auto group flex items-center justify-end gap-3 p-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all"
          >
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase">{t.pageNav.nextPage}</div>
              <div className="text-white font-semibold text-[var(--theme-accent)]">
                {nextPage.label}
              </div>
            </div>
            <div className="p-2 rounded bg-[var(--theme-card)] text-[var(--theme-accent)] group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ) : (
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-end gap-2 text-white/50 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 text-[var(--theme-accent)]" />
            <span>{t.pageNav.backToHome}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
