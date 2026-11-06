import React from 'react';
import { sql } from '@/lib/db';
import Link from 'next/link';
import { getAwardsVisibility } from '@/lib/settings';
import { toggleAwardsVisibilityAction } from '@/app/actions/settings';
import { Award, Mail, Shield, ArrowUpRight, CheckCircle2, AlertTriangle, Database, FolderGit2, Eye, EyeOff } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
    let toplamOdul = 0;
    let toplamProje = 0;
    let toplamMesaj = 0;
    let okunmamisMesaj = 0;
    let aktifOturum = 1;
    let awardsVisible = true;

    try {
        const [odulCountRes, projeCountRes, mesajCountRes, okunmamisCountRes, oturumCountRes, visibility] = await Promise.all([
            sql`SELECT COUNT(*)::int AS toplam FROM oduller`,
            sql`SELECT COUNT(*)::int AS toplam FROM projeler`.catch(() => [{ toplam: 0 }]),
            sql`SELECT COUNT(*)::int AS toplam FROM iletisim_mesajlari`,
            sql`SELECT COUNT(*)::int AS okunmamis FROM iletisim_mesajlari WHERE okundu = false`,
            sql`SELECT COUNT(*)::int AS aktif_oturum FROM oturumlar WHERE bitis > now() AND son_aktivite > now() - interval '30 minutes'`,
            getAwardsVisibility()
        ]);

        toplamOdul = odulCountRes[0]?.toplam || 0;
        toplamProje = projeCountRes[0]?.toplam || 0;
        toplamMesaj = mesajCountRes[0]?.toplam || 0;
        okunmamisMesaj = okunmamisCountRes[0]?.okunmamis || 0;
        aktifOturum = oturumCountRes[0]?.aktif_oturum || 1;
        awardsVisible = visibility;
    } catch (e) {
        console.error('Failed to load dashboard metrics:', e);
    }

    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white flex items-center gap-3">
                    <Database className="w-7 h-7 text-[var(--theme-accent)]" />
                    <span>System Overview & Control Panel</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-white/60 mt-1">
                    PostgreSQL database connected. Awards, projects, messages, and security sessions synced in real time.
                </p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Awards & Honors Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Awards & Honors
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
                            <span>{awardsVisible ? 'Publicly Visible' : 'Hidden from Site'}</span>
                        </span>

                        <form action={toggleAwardsVisibilityAction}>
                            <button
                                type="submit"
                                title={awardsVisible ? 'Hide from Main Site' : 'Show on Main Site'}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[10px] font-mono border border-white/10 transition-colors cursor-pointer"
                            >
                                {awardsVisible ? (
                                    <>
                                        <EyeOff className="w-3 h-3 text-amber-400" />
                                        <span>Hide</span>
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3 h-3 text-emerald-400" />
                                        <span>Show</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">oduller table</span>
                        <Link
                            href="/admin/awards"
                            className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                        >
                            <span>Manage & Add</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 2. Projects Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Projects
                        </span>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                        {toplamProje}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">projeler table</span>
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                        >
                            <span>Manage Projects</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 3. Unread Messages Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-sky-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Unread Messages
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
                        <span className="text-sm font-normal text-white/40 ml-2">/ {toplamMesaj} total</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">iletisim_mesajlari</span>
                        <Link
                            href="/admin/messages"
                            className="inline-flex items-center gap-1 text-sky-400 hover:underline font-semibold"
                        >
                            <span>Open Inbox</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 4. Active Sessions Card */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--theme-accent)] transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Active Sessions
                        </span>
                        <div className="p-2.5 rounded-xl bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--theme-accent)] mb-2">
                        {aktifOturum}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">30 min timeout</span>
                        <Link
                            href="/admin/sessions"
                            className="inline-flex items-center gap-1 text-[var(--theme-accent)] hover:underline font-semibold"
                        >
                            <span>Inspect</span>
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
                        <span>Security & Session Architecture</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• Session cookies protected with <strong>httpOnly</strong>, <strong>secure</strong>, and <strong>sameSite: lax</strong> flags.</li>
                        <li>• Sessions inactive for more than 30 minutes are invalidated automatically.</li>
                        <li>• Database operations utilize tagged template literals for guaranteed SQL injection protection.</li>
                    </ul>
                </div>

                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Data Privacy & GDPR/KVKK Compliance</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• 1-year data retention schedule applied to contact form submissions.</li>
                        <li>• 1-click batch anonymization tool available in the Messages section.</li>
                        <li>• Purge audit trail automatically recorded into the <strong>imha_kayitlari</strong> table.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
