'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { EDUCATION_DATA } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { GraduationCap, MapPin, Calendar, BookOpen, Terminal } from 'lucide-react';

export function EducationSection() {
  const { language, t } = usePortfolio();

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <SectionHeader
        tag={t.education.sectionTag}
        title={t.education.title}
        subtitle={t.education.subtitle}
      />

      {/* Main Education Card */}
      <div className="rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 space-y-8">
        {/* Top Info */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-accent)] mt-1">
              <GraduationCap className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {EDUCATION_DATA.institution[language]}
              </h3>
              <p className="text-sm font-semibold text-[var(--theme-accent)] font-mono-code mt-0.5">
                {EDUCATION_DATA.department[language]}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code text-white/50 mt-2">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>{EDUCATION_DATA.location[language]}</span>
                </span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>{EDUCATION_DATA.period[language]}</span>
                </span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="text-emerald-400 font-semibold">
                  {EDUCATION_DATA.status[language]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans">
          {EDUCATION_DATA.description[language]}
        </p>

        {/* 2-column breakdown: Coursework & Hands-on labs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {/* Column 1: Coursework */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] font-semibold uppercase">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>{t.education.curriculumHighlights}</span>
            </div>
            <ul className="space-y-2.5 font-mono-code text-xs text-white/70">
              {EDUCATION_DATA.keyCoursework[language].map((course) => (
                <li
                  key={course}
                  className="flex items-start gap-2.5 p-2.5 rounded bg-[var(--theme-surface)] border border-white/5"
                >
                  <span className="text-[var(--theme-accent)] font-bold shrink-0" aria-hidden="true">&gt;</span>
                  <span>{course}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Practical Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] font-semibold uppercase">
              <Terminal className="w-4 h-4" aria-hidden="true" />
              <span>{t.education.handsOnFocus}</span>
            </div>
            <ul className="space-y-2.5 font-mono-code text-xs text-white/70">
              {EDUCATION_DATA.practicalFocus[language].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 p-2.5 rounded bg-[var(--theme-surface)] border border-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
