'use client';

import React from 'react';
import {
  Mail,
  Trash2,
  ShieldAlert,
  History,
  Check,
  Calendar,
} from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';
import { ContactMessage, DeletionAuditLog } from '@/types/admin';
import { getLocaleFromLanguage } from '@/lib/utils';

interface AdminMessagesClientProps {
  messages: ContactMessage[];
  auditLogs: DeletionAuditLog[];
  onMarkRead: (formData: FormData) => Promise<void>;
  onDelete: (formData: FormData) => Promise<void>;
  onAnonymize: () => Promise<void>;
}

export function AdminMessagesClient({
  messages,
  auditLogs,
  onMarkRead,
  onDelete,
  onAnonymize,
}: AdminMessagesClientProps) {
  const { language } = usePortfolio();
  const t = adminTranslations[language] || adminTranslations.en;

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const dateLocale = getLocaleFromLanguage(language);

  return (
    <div className="space-y-8">
      {/* Page Header and Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
            <Mail className="w-6 h-6 text-sky-400" />
            <span>{t.messages.title}</span>
          </h1>
          <p className="text-xs font-mono text-white/60 mt-1">
            {t.messages.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
            {t.messages.stats(messages.length, unreadCount)}
          </div>

          {/* Legal Compliance / GDPR Anonymization Action */}
          <form action={onAnonymize}>
            <button
              type="submit"
              title={t.messages.anonymizeTooltip}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{t.messages.anonymizeButton}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Retention & Audit Log Banner */}
      <div className="bg-[var(--theme-card)]/80 border border-[var(--theme-border)] rounded-2xl p-5 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
          <History className="w-4 h-4" />
          <span>{t.messages.privacyBannerTitle}</span>
        </div>
        <p className="text-xs font-mono text-white/70 leading-relaxed">
          {t.messages.privacyBannerDesc}
        </p>

        {auditLogs && auditLogs.length > 0 && (
          <div className="pt-2 border-t border-white/10">
            <div className="text-[11px] font-mono font-semibold text-white/80 mb-2">
              {t.messages.recentAuditsTitle}
            </div>
            <div className="space-y-1.5">
              {auditLogs.map((audit) => (
                <div
                  key={audit.id}
                  className="text-xs font-mono bg-[var(--theme-surface)] border border-white/10 px-3 py-1.5 rounded-lg text-white/80 flex items-center justify-between"
                >
                  <span>
                    {t.messages.auditItem(audit.id, audit.anonymizedCount)}
                  </span>
                  <span className="text-white/40 text-[11px]">
                    {new Date(audit.executedAt).toLocaleString(dateLocale)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Messages List */}
      {messages.length === 0 ? (
        <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-12 text-center text-white/40 font-mono text-xs">
          {t.messages.empty}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => {
            const isAnonymized =
              msg.fullName === 'Anonim' || msg.fullName === 'Anonymous';
            return (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl border transition-all ${
                  !msg.isRead
                    ? 'bg-sky-950/20 border-sky-500/50 shadow-lg shadow-sky-950/20'
                    : 'bg-[var(--theme-card)]/90 border-[var(--theme-border)]'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-sm text-white">
                        {msg.fullName}
                      </span>
                      {isAnonymized && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {t.messages.badgeAnonymized}
                        </span>
                      )}
                      {msg.consentGiven && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {t.messages.badgeConsent}
                        </span>
                      )}
                      {!msg.isRead && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 animate-pulse">
                          {t.messages.badgeNew}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-white/60">
                      {msg.email}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(msg.createdAt).toLocaleString(dateLocale)}
                    </span>
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-3.5 rounded-xl bg-[var(--theme-surface)]/80 border border-white/10 text-xs font-mono text-white/90 whitespace-pre-wrap leading-relaxed mb-4">
                  {msg.message}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <div>
                    <span className="text-white/40">
                      {t.messages.messageId(msg.id)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!msg.isRead && (
                      <form action={onMarkRead}>
                        <input type="hidden" name="id" value={msg.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.messages.markRead}</span>
                        </button>
                      </form>
                    )}

                    <form action={onDelete}>
                      <input type="hidden" name="id" value={msg.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-red-500/20 hover:text-red-400 text-white/60 border border-white/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{t.messages.delete}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default AdminMessagesClient;
