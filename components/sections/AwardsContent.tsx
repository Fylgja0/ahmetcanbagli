'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import {
  Trophy,
  Award,
  Calendar,
  Building2,
  Tag,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { AwardRecord } from '@/types/portfolio';
import { formatOrdinalRank, getLocaleFromLanguage } from '@/lib/utils';

interface AwardsContentProps {
  awards: AwardRecord[];
  featuredAwards: AwardRecord[];
  isVisible: boolean;
}

export function AwardsContent({
  awards,
  featuredAwards,
  isVisible,
}: AwardsContentProps) {
  const { t, language } = usePortfolio();
  const currentLocale = getLocaleFromLanguage(language);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Top Navigation / Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[var(--theme-accent,#00ff66)] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.awardsPage.backToHome}</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t.awardsPage.liveDatabaseBadge}</span>
        </div>
      </div>

      {/* Admin Hidden Page Preview Warning */}
      {!isVisible && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
            <div>{t.awardsPage.previewWarning}</div>
          </div>
          <Link
            href="/admin/awards"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-bold transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>{t.awardsPage.previewAdminButton}</span>
          </Link>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5" />
          <span>{t.awardsPage.badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
          {t.awardsPage.title}
        </h1>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          {t.awardsPage.subtitle}
        </p>
      </div>

      {/* Featured Awards Section */}
      {featuredAwards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.awardsPage.featuredTitle}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredAwards.map((item, idx) => (
              <div
                key={item.id}
                className="relative p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[var(--theme-card,#0f172a)] to-[var(--theme-surface,#020617)] shadow-lg shadow-amber-950/20 flex flex-col justify-between group hover:border-amber-400/60 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                      #{idx + 1} {language === 'tr' ? 'ÖNE ÇIKAN' : 'FEATURED'}
                    </span>
                    {item.rank && (
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {formatOrdinalRank(item.rank, language, true)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-mono leading-snug group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-white/70 line-clamp-3 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>{item.organization || '-'}</span>
                  <span>
                    {item.date ? new Date(item.date).getFullYear() : '-'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Awards Grid */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[var(--theme-accent,#00ff66)]" />
            <span>
              {t.awardsPage.allTitle} ({awards.length})
            </span>
          </h2>
          <span className="text-xs font-mono text-white/50">
            {awards.length} {t.awardsPage.allCount}
          </span>
        </div>

        {awards.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-white/10 bg-[var(--theme-card,#0f172a)] text-white/60 font-mono text-xs">
            {t.awardsPage.emptyNotice}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {awards.map((award) => (
              <div
                key={award.id}
                className="p-6 rounded-2xl border border-[var(--theme-border,#1e293b)] bg-[var(--theme-card,#0f172a)] hover:border-[var(--theme-accent,#00ff66)] transition-all flex flex-col justify-between group shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    {award.categoryName ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--theme-surface,#020617)] text-[var(--theme-accent,#00ff66)] border border-white/10">
                        <Tag className="w-3 h-3" />
                        <span>{award.categoryName}</span>
                      </span>
                    ) : (
                      <span />
                    )}

                    {award.rank && (
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {formatOrdinalRank(award.rank, language, true)}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white font-mono group-hover:text-[var(--theme-accent,#00ff66)] transition-colors">
                    {award.title}
                  </h3>

                  {award.description && (
                    <p className="text-xs text-white/70 font-sans leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/50">
                  {award.organization && (
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-white/40" />
                      <span>{award.organization}</span>
                    </div>
                  )}

                  {award.date && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/40" />
                      <span>
                        {new Date(award.date).toLocaleDateString(currentLocale)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default AwardsContent;
