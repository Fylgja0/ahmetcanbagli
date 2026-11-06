'use client';

import React from 'react';
import Link from 'next/link';
import {
    Award,
    Mail,
    Shield,
    ArrowUpRight,
    CheckCircle2,
    AlertTriangle,
    Database,
    FolderGit2,
    Eye,
    EyeOff
} from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';

interface AdminDashboardClientProps {
    adminEmail: string;
    awardsVisible: boolean;
    toplamOdul: number;
    toplamProje: number;
    okunmamisMesaj: number;
    toplamMesaj: number;
    aktifOturum: number;
    onToggleAwardsVisibility: () => Promise<void>;
}

export function AdminDashboardClient({
    adminEmail,
    awardsVisible,
    toplamOdul,
    toplamProje,
    okunmamisMesaj,
    toplamMesaj,
    aktifOturum,
    onToggleAwardsVisibility,
}: AdminDashboardClientProps) {
    const { language } = usePortfolio();
    const t = adminTranslations[language] || adminTranslations.en;

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white flex items-center gap-3">
                    <Database className="w-7 h-7 text-[var(--theme-accent)]" />
                    <span>{t.dashboard.pageTitle}</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-white/60 mt-1">
                    {t.dashboard.pageSubtitle(adminEmail)}
                </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Awards & Honors Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            {t.dashboard.awardsCard.title}
                        </span>
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                            <Award className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                        {toplamOdul}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            awardsVisible
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${awardsVisible ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            <span>{awardsVisible ? t.awards.visibility.liveStatus : t.awards.visibility.hiddenStatus}</span>
                        </span>

                        <form action={onToggleAwardsVisibility}>
                            <button
                                type="submit"
                                title={awardsVisible ? t.dashboard.awardsCard.hideTitle : t.dashboard.awardsCard.showTitle}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[10px] font-mono border border-white/10 transition-colors cursor-pointer"
                            >
                                {awardsVisible ? (
                                    <>
                                        <EyeOff className="w-3 h-3 text-amber-400" />
                                        <span>{t.dashboard.awardsCard.hide}</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3 h-3 text-emerald-400" />
                                        <span>{t.dashboard.awardsCard.show}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">{t.dashboard.awardsCard.table}</span>
                        <Link
                            href="/admin/awards"
                            className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                        >
                            <span>{t.dashboard.awardsCard.manage}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 2. Projects Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            {t.dashboard.projectsCard.title}
                        </span>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                        {toplamProje}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">{t.dashboard.projectsCard.table}</span>
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                        >
                            <span>{t.dashboard.projectsCard.manage}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 3. Unread Messages Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-sky-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            {t.dashboard.messagesCard.title}
                        </span>
                        <div className={`p-2.5 rounded-xl border ${
                            okunmamisMesaj > 0
                                ? 'bg-red-500/15 border-red-500/40 text-red-400 animate-pulse'
                                : 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                        }`}>
                            <Mail className="w-5 h-5" />
                        </div>
                    </div>
                    <div className={`text-3xl sm:text-4xl font-bold font-mono mb-2 ${
                        okunmamisMesaj > 0 ? 'text-red-400' : 'text-white'
                    }`}>
                        {okunmamisMesaj}
                        <span className="text-sm font-normal text-white/40 ml-2">/ {toplamMesaj} {t.dashboard.messagesCard.totalSuffix}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">{t.dashboard.messagesCard.table}</span>
                        <Link
                            href="/admin/messages"
                            className="inline-flex items-center gap-1 text-sky-400 hover:underline font-semibold"
                        >
                            <span>{t.dashboard.messagesCard.manage}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 4. Active Sessions Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--theme-accent)] transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            {t.dashboard.sessionsCard.title}
                        </span>
                        <div className="p-2.5 rounded-xl bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--theme-accent)] mb-2">
                        {aktifOturum}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">{t.dashboard.sessionsCard.timeoutNotice}</span>
                        <Link
                            href="/admin/sessions"
                            className="inline-flex items-center gap-1 text-[var(--theme-accent)] hover:underline font-semibold"
                        >
                            <span>{t.dashboard.sessionsCard.manage}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Architecture & Compliance Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-[var(--theme-accent)] mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.dashboard.securityCard.title}</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• {t.dashboard.securityCard.item1}</li>
                        <li>• {t.dashboard.securityCard.item2}</li>
                        <li>• {t.dashboard.securityCard.item3}</li>
                    </ul>
                </div>

                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{t.dashboard.privacyCard.title}</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• {t.dashboard.privacyCard.item1}</li>
                        <li>• {t.dashboard.privacyCard.item2}</li>
                        <li>• {t.dashboard.privacyCard.item3}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

