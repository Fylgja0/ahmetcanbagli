'use client';

import React, { useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { Project } from '@/types/portfolio';
import { useKeydown } from '@/hooks/use-click-outside';
import { TechBadge } from '@/components/ui/TechBadge';
import {
  X,
  Github,
  ExternalLink,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Code2,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language, t } = usePortfolio();
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape key
  useKeydown('Escape', onClose, Boolean(project));

  // Lock body scroll and focus close button when opened
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContentRef}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl p-6 sm:p-8 space-y-8 my-auto"
      >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)]">
              <span>
                {project.category === 'backend'
                  ? t.projects.modalSpecBackend
                  : t.projects.modalSpecDataScience}
              </span>
              <span className="text-white/20" aria-hidden="true">·</span>
              <span className="text-white/50">{project.slug}</span>
            </div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 font-mono-code">
              {project.tagline[language]}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label={t.projects.modalClose}
            className="p-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] text-white/80 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code">
          {project.highlights[language].map((hl) => (
            <div
              key={hl.label}
              className="p-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] text-center"
            >
              <div className="text-[10.5px] text-white/50 mb-0.5">{hl.label}</div>
              <div className="text-xs sm:text-sm font-bold text-[var(--theme-accent)]">
                {hl.value}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] uppercase">
            <Code2 className="w-4 h-4" aria-hidden="true" />
            <span>{t.projects.modalOverviewTitle}</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-sans">
            {project.overview[language]}
          </p>
        </div>

        {/* Architecture & Engineering Stack Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-code text-white/60 uppercase">
            <Layers className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>{t.projects.architectureHeader}</span>
          </div>
          <div className="rounded-lg border border-[var(--theme-border)] overflow-hidden font-mono-code text-xs">
            <div className="grid grid-cols-12 bg-black/40 border-b border-white/10 p-2.5 font-bold text-white/60 text-[11px]">
              <div className="col-span-3">Katman / Layer</div>
              <div className="col-span-4">Rol / Role</div>
              <div className="col-span-5">Teknolojik Detay / Spec</div>
            </div>
            <div className="divide-y divide-white/5">
              {project.architecture[language].map((arch) => (
                <div key={arch.layer} className="grid grid-cols-12 p-3 items-center hover:bg-white/5 transition-colors">
                  <div className="col-span-3 font-semibold text-[var(--theme-accent)]">
                    {arch.layer}
                  </div>
                  <div className="col-span-4 text-white/80 text-[11.5px]">{arch.role}</div>
                  <div className="col-span-5 text-white/60 text-[11px] font-sans">{arch.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Concepts / Engineering Insights (2 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Engineering Insights */}
          <div className="space-y-3 p-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] font-bold">
              <Cpu className="w-4 h-4" aria-hidden="true" />
              <span>{t.projects.engineeringHeader}</span>
            </div>
            <ul className="space-y-2 text-xs text-white/75 font-sans">
              {project.engineeringInsights[language].map((insight) => (
                <li key={insight} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Future Roadmap / Next Improvements */}
          <div className="space-y-3 p-4 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)]">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] font-bold">
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>{t.projects.roadmapHeader}</span>
            </div>
            <ul className="space-y-2 text-xs text-white/75 font-sans">
              {project.futureRoadmap[language].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)] mt-1.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Pills using TechBadge */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="text-[11px] font-mono-code text-white/50 uppercase">
            {t.projects.modalTechTitle}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <TechBadge key={tech} label={tech} variant="default" size="sm" />
            ))}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-mono-code text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border border-[var(--theme-border)] text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
          >
            {t.projects.modalClose}
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold bg-[var(--theme-accent)] text-black hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--theme-accent)]"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            <span>{t.projects.modalRepoButton}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
