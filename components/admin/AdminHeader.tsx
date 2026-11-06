'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Award,
    Mail,
    Shield,
    LogOut,
    Terminal,
    Sparkles,
    FolderGit2
} from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';
import { AdminNavButtons } from './AdminNavButtons';

interface AdminHeaderProps {
    email: string;
    onSignOut: () => Promise<void>;
}

export function AdminHeader({ email, onSignOut }: AdminHeaderProps) {
    const pathname = usePathname();
    const { language } = usePortfolio();
    const t = adminTranslations[language] || adminTranslations.en;

    const isActive = (path: string) => {
        if (path === '/admin') {
            return pathname === '/admin';
        }
        return pathname?.startsWith(path);
    };

    return (
        <div className="space-y-6">
            {/* Top Bar: Nav Buttons and Admin Panel Title */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--theme-card)]/80 backdrop-blur-md border border-[var(--theme-border)] shadow-xl">
                {/* Left: Dynamic Back and Portfolio Buttons */}
                <div className="flex items-center gap-4">
                    <AdminNavButtons />

                    <div className="h-5 w-px bg-[var(--theme-border)] hidden sm:block" />

                    <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                        <Terminal className="w-4 h-4 text-[var(--theme-accent)]" />
                        <span>{t.layout.title}</span>
                    </div>
                </div>

                {/* Right: Administrator Info and Sign Out */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <span className="block text-xs font-mono font-medium text-white/90">
                            {email}
                        </span>
                        <span className="block text-[10px] text-[var(--theme-accent)] font-mono">
                            {t.layout.sessionActive}
                        </span>
                    </div>

                    <form action={onSignOut}>
                        <button
                            type="submit"
                            title={t.layout.signOut}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>{t.layout.signOut}</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[var(--theme-border)] pb-3 overflow-x-auto">
                <Link
                    href="/admin"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all shrink-0 ${
                        isActive('/admin')
                            ? 'bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] border-[var(--theme-border)]'
                            : 'text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border-[var(--theme-border)]'
                    }`}
                >
                    <LayoutDashboard className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>{t.layout.tabs.dashboard}</span>
                </Link>

                <Link
                    href="/admin/awards"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all shrink-0 ${
                        isActive('/admin/awards')
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                            : 'text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border-[var(--theme-border)]'
                    }`}
                >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>{t.layout.tabs.awards}</span>
                </Link>

                <Link
                    href="/admin/projects"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all shrink-0 ${
                        isActive('/admin/projects')
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                            : 'text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border-[var(--theme-border)]'
                    }`}
                >
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>{t.layout.tabs.projects}</span>
                </Link>

                <Link
                    href="/admin/messages"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all shrink-0 ${
                        isActive('/admin/messages')
                            ? 'bg-sky-500/15 text-sky-300 border-sky-500/40'
                            : 'text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border-[var(--theme-border)]'
                    }`}
                >
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>{t.layout.tabs.messages}</span>
                </Link>

                <Link
                    href="/admin/sessions"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all shrink-0 ${
                        isActive('/admin/sessions')
                            ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40'
                            : 'text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border-[var(--theme-border)]'
                    }`}
                >
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <span>{t.layout.tabs.sessions}</span>
                </Link>

                <Link
                    href="/awards"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-white/50 hover:text-[var(--theme-accent)] transition-colors ml-auto shrink-0"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.layout.tabs.liveAwards}</span>
                </Link>
            </div>
        </div>
    );
}

