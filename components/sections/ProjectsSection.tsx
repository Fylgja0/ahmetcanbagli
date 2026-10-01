'use client';

import React, { useState, useRef } from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { FEATURED_PROJECTS } from '@/lib/data';
import { ProjectModal } from './ProjectModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechBadge } from '@/components/ui/TechBadge';
import {
  FolderGit2,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

export function ProjectsSection() {
  const { language, selectedProject, setSelectedProject, t } = usePortfolio();
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setMobileIndex((prev) => Math.min(prev + 1, FEATURED_PROJECTS.length - 1));
      } else {
        setMobileIndex((prev) => Math.max(prev - 1, 0));
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <SectionHeader
          tag={t.projects.sectionTag}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
          className="mb-0"
        />

        {/* Mobile Carousel Navigation */}
        <div className="flex md:hidden items-center justify-between gap-3 pt-2 border-t border-white/10">
          <span className="text-xs font-mono-code text-white/50">
            {mobileIndex + 1} / {FEATURED_PROJECTS.length} · {t.projects.swipeHint}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setMobileIndex((prev) => Math.max(prev - 1, 0))}
              disabled={mobileIndex === 0}
              aria-label={t.projects.prevProject}
              className="p-2 rounded border border-[var(--theme-border)] bg-[var(--theme-card)] disabled:opacity-30 disabled:pointer-events-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() =>
                setMobileIndex((prev) => Math.min(prev + 1, FEATURED_PROJECTS.length - 1))
              }
              disabled={mobileIndex === FEATURED_PROJECTS.length - 1}
              aria-label={t.projects.nextProject}
              className="p-2 rounded border border-[var(--theme-border)] bg-[var(--theme-card)] disabled:opacity-30 disabled:pointer-events-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display: Desktop 2-column Grid; Mobile Swipeable Card Carousel */}
      <div
        className="block md:grid md:grid-cols-2 gap-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {FEATURED_PROJECTS.map((project, index) => {
          const isMobileHidden = index !== mobileIndex;

          return (
            <article
              key={project.id}
              className={`rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] p-6 sm:p-8 flex flex-col justify-between hover:border-[var(--theme-accent)] transition-all relative overflow-hidden group ${
                isMobileHidden ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Project Header: Category & Slug */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs font-mono-code">
                  <div className="flex items-center gap-2 text-[var(--theme-accent)]">
                    <FolderGit2 className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {project.category === 'backend'
                        ? t.projects.categoryBackend
                        : t.projects.categoryDataScience}
                    </span>
                  </div>
                  <span className="text-white/40 text-[11px]">{project.slug}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[var(--theme-accent)] transition-colors">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-white/60 font-mono-code mb-5">
                  {project.tagline[language]}
                </p>

                {/* Overview preview */}
                <p className="text-sm text-white/80 leading-relaxed mb-6 font-sans line-clamp-3">
                  {project.overview[language]}
                </p>

                {/* Architecture Highlights Pill Strip */}
                <div className="grid grid-cols-2 gap-2 mb-6 font-mono-code text-xs">
                  {project.highlights[language].slice(0, 2).map((hl) => (
                    <div
                      key={hl.label}
                      className="p-2.5 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)]"
                    >
                      <div className="text-[10px] text-white/40 mb-0.5">{hl.label}</div>
                      <div className="font-semibold text-white/90 text-xs truncate">
                        {hl.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technologies Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <TechBadge key={tech} label={tech} variant="default" size="xs" />
                  ))}
                  {project.technologies.length > 6 && (
                    <TechBadge
                      label={`+${project.technologies.length - 6}`}
                      variant="subtle"
                      size="xs"
                    />
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono-code text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-semibold text-[var(--theme-accent)] hover:bg-[var(--theme-badge-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
                >
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.projects.viewDeepDive}</span>
                </button>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[var(--theme-border)] text-white/80 hover:text-white hover:border-[var(--theme-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
                >
                  <Github className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-white/40" aria-hidden="true" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Modal View */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
