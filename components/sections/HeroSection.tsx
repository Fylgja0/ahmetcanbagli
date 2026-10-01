'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PERSONAL_INFO } from '@/lib/data';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export function HeroSection() {
  const { t } = usePortfolio();

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Terminal prompt header */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--theme-border)] bg-[var(--theme-card)] font-mono-code text-xs text-[var(--theme-text-muted)] w-fit mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] animate-pulse" />
        <span>{t.hero.statusBadge}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Main Hero Left Column (8 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-3">
            <div className="font-mono-code text-xs text-white/50 tracking-wider">
              {t.hero.greeting}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {PERSONAL_INFO.name}
            </h1>
            <div className="text-lg sm:text-xl font-mono-code text-[var(--theme-accent)] font-semibold">
              {t.hero.headline}
            </div>
          </div>

          <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl">
            {t.hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono-code text-sm font-semibold bg-[var(--theme-accent)] text-black hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--theme-accent)] shadow-md"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono-code text-sm font-semibold border border-[var(--theme-border)] bg-[var(--theme-card)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <span>{t.hero.secondaryCta}</span>
              <Mail className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Social profile buttons row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono-code text-xs font-semibold border border-[var(--theme-border)] bg-[var(--theme-card)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-surface)] hover:shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.25)] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <Github className="w-4 h-4 text-[var(--theme-accent)] group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--theme-accent)] transition-colors" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono-code text-xs font-semibold border border-[var(--theme-border)] bg-[var(--theme-card)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] hover:bg-[var(--theme-surface)] hover:shadow-[0_0_15px_rgba(var(--theme-accent-rgb),0.25)] transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <Linkedin className="w-4 h-4 text-[var(--theme-accent)] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--theme-accent)] transition-colors" />
            </a>
          </div>
        </div>

        {/* Hero Right Column: Interactive Terminal Preview (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl overflow-hidden font-mono-code text-xs">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-black/40 border-b border-white/10 text-white/50 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-white/40">mcbu-session://ahmetcan</span>
              <span className="text-[10px] text-[var(--theme-accent)]">bash 5.2</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 space-y-3 leading-relaxed text-white/85">
              <div>
                <span className="text-[var(--theme-accent)] font-semibold">
                  {t.hero.terminalPrefix}
                </span>{' '}
                <span className="text-white">whoami</span>
              </div>
              <div className="text-white/60 pl-2 border-l border-[var(--theme-border)]">
                &gt; {t.hero.terminalUser}
                <br />
                &gt; {t.hero.terminalUni}
                <br />
                &gt; {t.hero.terminalProg}
              </div>

              <div>
                <span className="text-[var(--theme-accent)] font-semibold">
                  {t.hero.terminalPrefix}
                </span>{' '}
                <span className="text-white">dotnet --info | grep &quot;Runtime&quot;</span>
              </div>
              <div className="text-white/60 pl-2 border-l border-[var(--theme-border)]">
                &gt; {t.hero.terminalRuntime}
                <br />
                &gt; {t.hero.terminalArch}
                <br />
                &gt; {t.hero.terminalDb}
              </div>

              <div>
                <span className="text-[var(--theme-accent)] font-semibold">
                  {t.hero.terminalPrefix}
                </span>{' '}
                <span className="text-white">python3 -m science.stats</span>
              </div>
              <div className="text-white/60 pl-2 border-l border-[var(--theme-border)]">
                &gt; {t.hero.terminalPackages}
                <br />
                &gt; {t.hero.terminalFocus}
              </div>

              <div className="pt-2 flex items-center gap-2 text-[var(--theme-accent)]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.hero.systemInit}</span>
              </div>
            </div>
          </div>

          {/* Quick 3-card stats underneath terminal */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-center font-mono-code">
            <div className="p-2.5 rounded border border-[var(--theme-border)] bg-[var(--theme-card)]">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">
                {t.hero.statInstitutionLabel}
              </div>
              <div className="text-xs font-semibold text-white mt-0.5 truncate">MCBU</div>
            </div>
            <div className="p-2.5 rounded border border-[var(--theme-border)] bg-[var(--theme-card)]">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">
                {t.hero.statProgramLabel}
              </div>
              <div className="text-xs font-semibold text-[var(--theme-accent)] mt-0.5 truncate">
                {t.hero.statProgramValue}
              </div>
            </div>
            <div className="p-2.5 rounded border border-[var(--theme-border)] bg-[var(--theme-card)]">
              <div className="text-[10px] text-white/40 uppercase tracking-wider">
                {t.hero.statSourceLabel}
              </div>
              <div className="text-xs font-semibold text-white mt-0.5 truncate">
                {t.hero.statSourceValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
