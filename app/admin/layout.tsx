import React from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getAdmin } from '@/lib/auth';
import { sql } from '@/lib/db';
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
import { AdminNavButtons } from '@/components/admin/AdminNavButtons';

async function cikisYapAction() {
    'use server';
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (token) {
        await sql`DELETE FROM oturumlar WHERE token = ${token}`;
        cookieStore.delete('admin_token');
    }

    redirect('/giris');
}

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await getAdmin();
    if (!admin) {
        redirect('/giris');
    }

    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            {/* Top Bar: Nav Buttons and Admin Panel Title */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--theme-card)]/80 backdrop-blur-md border border-[var(--theme-border)] shadow-xl">
                {/* Left: Dynamic Back and Portfolio Buttons */}
                <div className="flex items-center gap-4">
                    <AdminNavButtons />

                    <div className="h-5 w-px bg-[var(--theme-border)] hidden sm:block" />

                    <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                        <Terminal className="w-4 h-4 text-[var(--theme-accent)]" />
                        <span>ADMIN CONTROL PANEL</span>
                    </div>
                </div>

                {/* Right: Administrator Info and Sign Out */}
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <span className="block text-xs font-mono font-medium text-white/90">
                            {admin.eposta}
                        </span>
                        <span className="block text-[10px] text-[var(--theme-accent)] font-mono">
                            ● Active Session (30 min timeout)
                        </span>
                    </div>

                    <form action={cikisYapAction}>
                        <button
                            type="submit"
                            title="Secure Sign Out"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-semibold transition-all cursor-pointer"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[var(--theme-border)] pb-3 overflow-x-auto">
                <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border border-[var(--theme-border)] transition-all shrink-0"
                >
                    <LayoutDashboard className="w-4 h-4 text-[var(--theme-accent)]" />
                    <span>Dashboard & Overview</span>
                </Link>

                <Link
                    href="/admin/oduller"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border border-[var(--theme-border)] transition-all shrink-0"
                >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Awards & Honors</span>
                </Link>

                <Link
                    href="/admin/projeler"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border border-[var(--theme-border)] transition-all shrink-0"
                >
                    <FolderGit2 className="w-4 h-4 text-emerald-400" />
                    <span>Projects</span>
                </Link>

                <Link
                    href="/admin/mesajlar"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border border-[var(--theme-border)] transition-all shrink-0"
                >
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>Inbox Messages</span>
                </Link>

                <Link
                    href="/admin/oturumlar"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white/80 hover:text-white bg-[var(--theme-surface)] hover:bg-[var(--theme-card)] border border-[var(--theme-border)] transition-all shrink-0"
                >
                    <Shield className="w-4 h-4 text-indigo-400" />
                    <span>Active Sessions</span>
                </Link>

                <Link
                    href="/oduller"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-white/50 hover:text-[var(--theme-accent)] transition-colors ml-auto shrink-0"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View Live Awards Page ↗</span>
                </Link>
            </div>

            {/* İçerik */}
            <main>
                {children}
            </main>
        </div>
    );
}
