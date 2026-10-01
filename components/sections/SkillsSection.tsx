'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { SKILL_CATEGORIES } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';
import { Server, Brain, Database, Wrench, Terminal, CheckCircle2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Brain,
  Database,
  Wrench,
};

export function SkillsSection() {
  const { language, t } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <SectionHeader
        tag={t.skills.sectionTag}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
        className="mb-8"
      />

      {/* Interactive Category Filter - segmented controls */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--theme-surface)] rounded-lg border border-[var(--theme-border)] w-fit mb-10 font-mono-code text-xs">
        <button
          type="button"
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded transition-all ${
            activeCategory === 'all'
              ? 'bg-[var(--theme-accent)] text-black font-semibold shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          {t.skills.filterAll}
        </button>
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded transition-all ${
              activeCategory === cat.id
                ? 'bg-[var(--theme-accent)] text-black font-semibold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.title[language].split('&')[0].trim()}
          </button>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => {
          const Icon = ICON_MAP[category.icon] || Terminal;
          return (
            <div
              key={category.id}
              className="p-6 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-mono-code">
                      {category.title[language]}
                    </h3>
                    <p className="text-xs text-white/50 leading-tight">
                      {category.description[language]}
                    </p>
                  </div>
                </div>

                {/* Skills list within this category */}
                <div className="space-y-4 mt-6">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name[language]}
                      className="border-t border-white/5 pt-3 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs sm:text-sm font-semibold text-white font-mono-code flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                          <span>{skill.name[language]}</span>
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mb-2 leading-relaxed">
                        {skill.context[language]}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {skill.tags.map((tag) => (
                          <TechBadge key={tag} label={tag} variant="subtle" size="xs" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
