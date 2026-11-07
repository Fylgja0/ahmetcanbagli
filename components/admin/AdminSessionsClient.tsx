'use client';

import React from 'react';
import {
  ShieldCheck,
  Monitor,
  Smartphone,
  Globe,
  Clock,
  Trash2,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
} from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';
import { AdminSession } from '@/types/admin';
import { getLocaleFromLanguage } from '@/lib/utils';

interface AdminSessionsClientProps {
  sessions: AdminSession[];
  onPurgeExpired: () => Promise<void>;
  onRevokeOthers: () => Promise<void>;
}

function getDeviceIcon(ua: string | null = '') {
  const uaLower = (ua || '').toLowerCase();
  if (
    uaLower.includes('mobile') ||
    uaLower.includes('android') ||
    uaLower.includes('iphone')
  ) {
    return <Smartphone className="w-5 h-5 text-emerald-400" />;
  }
  if (
    uaLower.includes('windows') ||
    uaLower.includes('macintosh') ||
    uaLower.includes('linux')
  ) {
    return <Monitor className="w-5 h-5 text-sky-400" />;
  }
  return <Globe className="w-5 h-5 text-[var(--theme-accent)]" />;
}

export function AdminSessionsClient({
  sessions,
  onPurgeExpired,
  onRevokeOthers,
}: AdminSessionsClientProps) {
  const { language } = usePortfolio();
  const t = adminTranslations[language] || adminTranslations.en;
  const dateLocale = getLocaleFromLanguage(language);

  return (
    <div className="space-y-8">
      {/* Header and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
            <span>{t.sessions.title}</span>
          </h1>
          <p className="text-xs font-mono text-white/60 mt-1">
            {t.sessions.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Clear Expired */}
          <form action={onPurgeExpired}>
            <button
              type="submit"
              title={t.sessions.purgeTooltip}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 text-xs font-mono font-medium border border-[var(--theme-border)] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-white/50" />
              <span>{t.sessions.purgeExpired}</span>
            </button>
          </form>

          {/* Revoke All Other Sessions Action */}
          <form action={onRevokeOthers}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-red-950/40 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.sessions.revokeOthers}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Security Enforcement Card */}
      <div className="bg-[var(--theme-card)]/80 border border-[var(--theme-border)] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-2">
          <AlertOctagon className="w-4 h-4" />
          <span>{t.sessions.protocolsTitle}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-white/70 pt-3 border-t border-white/10">
          <div>
            <strong className="text-white block mb-1">
              {t.sessions.proto1Title}
            </strong>
            {t.sessions.proto1Desc}
          </div>
          <div>
            <strong className="text-white block mb-1">
              {t.sessions.proto2Title}
            </strong>
            {t.sessions.proto2Desc}
          </div>
          <div>
            <strong className="text-white block mb-1">
              {t.sessions.proto3Title}
            </strong>
            {t.sessions.proto3Desc}
          </div>
        </div>
      </div>

      {/* Active Sessions Table */}
      <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold font-mono text-white">
            {t.sessions.tableTitle(sessions.length)}
          </h3>
          <span className="text-[11px] font-mono text-white/50">
            {t.sessions.cookieNote}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
            <thead>
              <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                <th className="p-3.5">{t.sessions.colDevice}</th>
                <th className="p-3.5">{t.sessions.colLastActivity}</th>
                <th className="p-3.5">{t.sessions.colExpires}</th>
                <th className="p-3.5 text-right">{t.sessions.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sessions.map((session, index) => {
                const { isCurrentDevice } = session;
                return (
                  <tr
                    key={`${session.tokenPreview}-${index}`}
                    className={`transition-colors ${
                      isCurrentDevice
                        ? 'bg-emerald-500/10'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[var(--theme-surface)] border border-white/10 shrink-0">
                          {getDeviceIcon(session.userAgent)}
                        </div>
                        <div className="max-w-md">
                          <span className="text-xs text-white font-medium block truncate">
                            {session.userAgent || t.sessions.unknownClient}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">
                            Token: {session.tokenPreview}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-white/70">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span>
                          {new Date(session.lastActiveAt).toLocaleString(
                            dateLocale
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5 text-white/50">
                      {new Date(session.expiresAt).toLocaleString(dateLocale)}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      {isCurrentDevice ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.sessions.currentDevice}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--theme-surface)] text-white/50 border border-white/10">
                          <span>{t.sessions.otherSession}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminSessionsClient;
