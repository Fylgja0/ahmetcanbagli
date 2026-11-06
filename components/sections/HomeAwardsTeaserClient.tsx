'use client';

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/portfolio-context';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';
import { AwardRecord } from '@/types/portfolio';
import { formatOrdinalRank } from '@/lib/utils';

interface HomeAwardsTeaserClientProps {
  awards: AwardRecord[];
}

export function HomeAwardsTeaserClient({
  awards,
}: HomeAwardsTeaserClientProps) {
  const { language, t } = usePortfolio();

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-2xl border border-[var(--theme-border,#1e293b)] bg-[var(--theme-card,#0f172a)] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-mono text-xs border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.awardsTeaser.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>{t.awardsTeaser.title}</span>
            </h3>
            <p className="text-xs text-white/60 font-sans">
              {t.awardsTeaser.desc}
            </p>
          </div>

          <Link
            href="/awards"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--theme-accent,#00ff66)] hover:underline"
          >
            <span>
              {t.awardsTeaser.viewAll} ({awards.length}+)
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="p-4 rounded-xl border border-white/10 bg-[var(--theme-surface,#020617)]/80 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span className="text-amber-400 font-semibold">
                    {award.categoryName || t.awardsTeaser.defaultCategory}
                  </span>
                  {award.rank && (
                    <span className="font-bold text-amber-300">
                      {formatOrdinalRank(award.rank, language, false)}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white font-mono group-hover:text-amber-300 transition-colors line-clamp-2">
                  {award.title}
                </h4>
                {award.description && (
                  <p className="text-xs text-white/70 line-clamp-2 font-sans">
                    {award.description}
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>{award.organization || '-'}</span>
                <span>
                  {award.date ? new Date(award.date).getFullYear() : '-'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default HomeAwardsTeaserClient;
