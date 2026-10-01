'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { CURRENT_FOCUS_ITEMS } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';

export function CurrentFocusSection() {
  const { language, t } = usePortfolio();

  return (
    <section id="focus" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <SectionHeader
        tag={t.currentFocus.sectionTag}
        title={t.currentFocus.title}
        subtitle={t.currentFocus.subtitle}
      />

      {/* Grid of Focus Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CURRENT_FOCUS_ITEMS.map((item, index) => (
          <article
            key={item.id}
            className="p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header & Status */}
              <div className="flex items-center justify-between text-xs font-mono-code mb-4">
                <span className="text-[var(--theme-accent)] font-bold">
                  FOCUS_0{index + 1}
                </span>
                <span className="text-white/50 border border-white/10 px-2 py-0.5 rounded text-[10px]">
                  {item.status[language]}
                </span>
              </div>

              {/* Topic Title */}
              <h3 className="text-base font-bold text-white mb-3 group-hover:text-[var(--theme-accent)] transition-colors">
                {item.topic[language]}
              </h3>

              {/* Description */}
              <p className="text-xs text-white/70 leading-relaxed mb-6 font-sans">
                {item.description[language]}
              </p>
            </div>

            {/* Technologies list */}
            <div className="pt-4 border-t border-white/10 font-mono-code text-[11px] text-[var(--theme-text-muted)]">
              <div className="text-[10px] text-white/40 uppercase mb-2">
                {t.currentFocus.targetStack}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((tech) => (
                  <TechBadge key={tech} label={tech} variant="default" size="xs" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
