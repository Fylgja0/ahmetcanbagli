'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PERSONAL_INFO } from '@/lib/data';
import { ArrowUp, Github, Linkedin, Mail, Terminal } from 'lucide-react';

export function Footer() {
  const { t } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--theme-border)] bg-[var(--theme-surface)]/80 backdrop-blur-sm text-white/70 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Identity & Student Note */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 font-mono-code text-xs">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Terminal className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-white/40" aria-hidden="true">·</span>
            <span className="text-[var(--theme-accent)] text-xs">MCBU</span>
          </div>
          <p className="text-white/50 max-w-md">
            {t.footer.studentNote}
          </p>
          <p className="text-[11px] text-white/40">
            {t.footer.builtWith}
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4 text-xs font-mono-code">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 p-2 rounded border border-white/10 hover:border-[var(--theme-accent)] hover:text-white transition-colors bg-[var(--theme-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            aria-label={t.contact.githubLabel}
          >
            <Github className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 p-2 rounded border border-white/10 hover:border-[var(--theme-accent)] hover:text-white transition-colors bg-[var(--theme-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            aria-label={t.contact.linkedinLabel}
          >
            <Linkedin className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 p-2 rounded border border-white/10 hover:border-[var(--theme-accent)] hover:text-white transition-colors bg-[var(--theme-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            aria-label={t.contact.directEmailLabel}
          >
            <Mail className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
            <span>{t.footer.emailLabel}</span>
          </a>
        </div>

        {/* Right: Back to top */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded text-xs font-mono-code border border-[var(--theme-border)] text-white/80 hover:text-white bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
          </button>
          <span className="text-[11px] text-white/40 font-mono-code">
            © {currentYear} {PERSONAL_INFO.name}. {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}
