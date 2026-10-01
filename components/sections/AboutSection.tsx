'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShieldCheck, Database, BookOpen, Layers } from 'lucide-react';

const PRINCIPLE_ICONS = [Layers, Database, ShieldCheck];

export function AboutSection() {
  const { t } = usePortfolio();

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <SectionHeader
        tag={t.about.sectionTag}
        title={t.about.title}
        subtitle={t.about.subtitle}
        className="mb-12"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Narrative columns (7 cols) */}
        <div className="lg:col-span-7 space-y-5 text-white/80 leading-relaxed text-sm sm:text-base">
          <p className="border-l-2 border-[var(--theme-border)] pl-4 italic text-white/90 font-mono-code text-xs sm:text-sm">
            {t.about.p1}
          </p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>

          <div className="pt-4 flex items-center gap-3 font-mono-code text-xs text-[var(--theme-text-muted)]">
            <BookOpen className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>{t.about.cvNotice}</span>
          </div>
        </div>

        {/* Development Principles (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="font-mono-code text-xs text-white/40 uppercase tracking-wider mb-2">
            {t.about.principlesTitle}
          </div>
          {t.about.principles.map((p, index) => {
            const Icon = PRINCIPLE_ICONS[index] || ShieldCheck;
            return (
              <div
                key={p.title}
                className="p-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-accent)] group-hover:scale-105 transition-transform mt-0.5">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white font-mono-code mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/65 leading-normal">{p.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
