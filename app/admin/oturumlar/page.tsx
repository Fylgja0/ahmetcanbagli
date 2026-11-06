import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
    ShieldCheck,
    Monitor,
    Smartphone,
    Globe,
    Clock,
    Trash2,
    CheckCircle2,
    AlertOctagon,
    RefreshCw
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface OturumRow {
    token: string;
    yonetici_id: number;
    bitis: string;
    son_aktivite: string;
    cihaz: string | null;
}

// Server Action: Revoke All Other Sessions
async function digerOturumlariKapatAction() {
    'use server';
    const admin = await requireAdmin();
    const cookieStore = await cookies();
    const currentToken = cookieStore.get('admin_token')?.value;

    if (admin && currentToken) {
        await sql`
            DELETE FROM oturumlar 
            WHERE yonetici_id = ${admin.id} AND token <> ${currentToken}
        `;
        revalidatePath('/admin/oturumlar');
        revalidatePath('/admin');
    }
}

// Server Action: Clean Expired Sessions
async function suresiDolanlariTemizleAction() {
    'use server';
    await requireAdmin();

    await sql`
        DELETE FROM oturumlar
        WHERE bitis < now() OR son_aktivite < now() - interval '30 minutes'
    `;

    revalidatePath('/admin/oturumlar');
    revalidatePath('/admin');
}

function getDeviceIcon(ua: string | null = '') {
    const uaLower = (ua || '').toLowerCase();
    if (uaLower.includes('mobile') || uaLower.includes('android') || uaLower.includes('iphone')) {
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
    }
    if (uaLower.includes('windows') || uaLower.includes('macintosh') || uaLower.includes('linux')) {
        return <Monitor className="w-5 h-5 text-sky-400" />;
    }
    return <Globe className="w-5 h-5 text-[var(--theme-accent)]" />;
}

export default async function OturumlarPage() {
    const admin = await requireAdmin();
    if (!admin) return null;

    const cookieStore = await cookies();
    const currentToken = cookieStore.get('admin_token')?.value;

    let oturumlar: OturumRow[] = [];

    try {
        const rows = await sql`
            SELECT * FROM oturumlar 
            WHERE yonetici_id = ${admin.id} 
              AND bitis > now()
              AND son_aktivite > now() - interval '30 minutes'
            ORDER BY son_aktivite DESC
        `;
        oturumlar = rows as unknown as OturumRow[];
    } catch (e) {
        console.error('Failed to load active sessions:', e);
    }

    return (
        <div className="space-y-8">
            {/* Header and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        <span>Active Session Management</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        Browser sessions and devices authenticated with your administrator credentials.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Clear Expired */}
                    <form action={suresiDolanlariTemizleAction}>
                        <button
                            type="submit"
                            title="Purge sessions that are expired or inactive for more than 30 minutes"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 text-xs font-mono font-medium border border-[var(--theme-border)] transition-colors cursor-pointer"
                        >
                            <RefreshCw className="w-3.5 h-3.5 text-white/50" />
                            <span>Purge Expired</span>
                        </button>
                    </form>

                    {/* Revoke All Other Sessions Action */}
                    <form action={digerOturumlariKapatAction}>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-red-950/40 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Revoke All Other Sessions</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Security Enforcement Card */}
            <div className="bg-[var(--theme-card)]/80 border border-[var(--theme-border)] rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-2">
                    <AlertOctagon className="w-4 h-4" />
                    <span>Security Protocols & Enforcement</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-white/70 pt-3 border-t border-white/10">
                    <div>
                        <strong className="text-white block mb-1">1. Inactivity Timeout</strong>
                        Every interaction updates <code className="text-[var(--theme-accent)]">son_aktivite</code> timestamp. Inactive sessions terminate after 30 minutes.
                    </div>
                    <div>
                        <strong className="text-white block mb-1">2. Maximum Lifetime</strong>
                        The session cookie and database authorization expire after a hard limit of 2 hours.
                    </div>
                    <div>
                        <strong className="text-white block mb-1">3. Client Fingerprinting</strong>
                        The client User-Agent header is verified and recorded upon authentication to detect anomalies.
                    </div>
                </div>
            </div>

            {/* Active Sessions Table */}
            <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-white">
                        Authenticated Sessions ({oturumlar.length})
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        Cookie: <code className="text-indigo-300">admin_token</code> (httpOnly, secure, sameSite)
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">Device / Client User-Agent</th>
                                <th className="p-3.5">Last Activity (30m timeout)</th>
                                <th className="p-3.5">Expires At</th>
                                <th className="p-3.5 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {oturumlar.map((o) => {
                                const buCihazMi = o.token === currentToken;
                                return (
                                    <tr
                                        key={o.token}
                                        className={`transition-colors ${
                                            buCihazMi ? 'bg-emerald-500/10' : 'hover:bg-white/5'
                                        }`}
                                    >
                                        <td className="p-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-[var(--theme-surface)] border border-white/10 shrink-0">
                                                    {getDeviceIcon(o.cihaz)}
                                                </div>
                                                <div className="max-w-md">
                                                    <span className="text-xs text-white font-medium block truncate">
                                                        {o.cihaz || 'Unidentified Client'}
                                                    </span>
                                                    <span className="text-[10px] text-white/40 font-mono">
                                                        Token: {o.token.substring(0, 12)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3.5 text-white/70">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-white/40" />
                                                <span>{new Date(o.son_aktivite).toLocaleString('en-US')}</span>
                                            </div>
                                        </td>
                                        <td className="p-3.5 text-white/50">
                                            {new Date(o.bitis).toLocaleString('en-US')}
                                        </td>
                                        <td className="p-3.5 text-right whitespace-nowrap">
                                            {buCihazMi ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    <span>Current Device</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--theme-surface)] text-white/50 border border-white/10">
                                                    <span>Other Session</span>
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
