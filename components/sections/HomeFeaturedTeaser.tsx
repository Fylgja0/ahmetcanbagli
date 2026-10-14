'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import { FEATURED_PROJECTS } from '@/lib/data';
import {
  FolderGit2,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export function HomeFeaturedTeaser() {
  const { language, t } = usePortfolio();

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Featured Projects Highlight Banner */}
      <div className="rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-mono-code text-xs border border-[var(--theme-border)]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>{t.projects.allProjectsBadge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {t.projects.title}
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed">
              {t.projects.subtitle}
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-mono-code text-sm font-semibold bg-[var(--theme-accent)] text-black hover:opacity-90 transition-opacity w-fit shadow-lg"
          >
            <span>{t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2 Featured Project Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
          {FEATURED_PROJECTS.slice(0, 2).map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-white/10 bg-[var(--theme-surface)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-white/50 mb-2">
                  <span className="text-[var(--theme-accent)] font-semibold uppercase">
                    {proj.category === 'backend' ? t.projects.categoryBackend : t.projects.categoryDataScience}
                  </span>
                  <span>{proj.technologies.slice(0, 3).join(' · ')}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {proj.title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {proj.tagline[language]}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono-code text-xs">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <Link
                  href="/projects"
                  className="flex items-center gap-1 text-[var(--theme-accent)] hover:underline"
                >
                  <span>{t.projects.viewDeepDive}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Contact CTA Card */}
      <div className="rounded-2xl border border-[var(--theme-border)] bg-gradient-to-r from-[var(--theme-surface)] to-[var(--theme-card)] p-8 text-center flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border border-[var(--theme-border)] bg-[var(--theme-card)] flex items-center justify-center text-[var(--theme-accent)] shadow-md">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          {t.contact.title}
        </h3>
        <p className="text-sm text-white/70 max-w-lg">
          {t.contact.subtitle}
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono-code text-sm font-semibold bg-[var(--theme-accent)] text-black hover:opacity-90 transition-opacity shadow-lg"
          >
            <span>{t.hero.secondaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
