'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';

interface AdminLoginClientProps {
  error?: string;
  onLogin: (formData: FormData) => Promise<void>;
}

export function AdminLoginClient({ error, onLogin }: AdminLoginClientProps) {
  const { language } = usePortfolio();
  const t = adminTranslations[language] || adminTranslations.en;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 pt-24 sm:pt-28 pb-12 relative">
      <div className="w-full max-w-md relative z-10">
        {/* Back to Portfolio Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[var(--theme-accent)] transition-colors mb-6 group px-3.5 py-2 rounded-lg bg-[var(--theme-surface)]/80 border border-[var(--theme-border)] shadow-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.login.backToPortfolio}</span>
        </Link>

        <div className="bg-[var(--theme-card)]/90 backdrop-blur-xl border border-[var(--theme-border)] rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Header & Security Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)] mb-4 shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-mono">
              {t.login.badgeTitle}
            </h1>
            <p className="text-xs text-white/60 mt-1.5 font-mono">
              {t.login.badgeSubtitle}
            </p>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form action={onLogin} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-white/80 font-medium mb-1.5">
                {t.login.emailLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={t.login.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 font-medium mb-1.5">
                {t.login.passwordLabel}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder={t.login.passwordPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 bg-[var(--theme-accent)] hover:opacity-90 text-black font-mono text-xs font-bold rounded-lg shadow-lg shadow-[var(--theme-accent)]/20 transition-all cursor-pointer"
            >
              {t.login.submitButton}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/50 font-mono">
              {t.login.footerNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminLoginClient;
