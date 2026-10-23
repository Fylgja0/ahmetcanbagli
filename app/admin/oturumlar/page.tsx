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

// Server Action: Görev 6.3 - Diğer Tüm Oturumları Kapat
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

// Server Action: Görev 6.SQL - Süresi Dolmuş Oturumları Temizle
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
        console.error('Oturumlar çekilemedi:', e);
    }

    return (
        <div className="space-y-8">
            {/* Başlık ve Butonlar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <ShieldCheck className="w-6 h-6 text-indigo-400" />
                        <span>Aktif Oturum Yönetimi (Görev 6)</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        Yönetici hesabınızla açılmış olan tarayıcı oturumları ve cihazlar.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Süresi Dolanları Temizle */}
                    <form action={suresiDolanlariTemizleAction}>
                        <button
                            type="submit"
                            title="Süresi dolmuş veya 30 dakikadır işlem yapılmamış oturumları temizler"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 text-xs font-mono font-medium border border-[var(--theme-border)] transition-colors cursor-pointer"
                        >
                            <RefreshCw className="w-3.5 h-3.5 text-white/50" />
                            <span>Süresi Dolanları Temizle</span>
                        </button>
                    </form>

                    {/* Diğer Tüm Oturumları Kapat Düğmesi (Görev 6.3) */}
                    <form action={digerOturumlariKapatAction}>
                        <button
                            type="submit"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-red-950/40 cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Diğer Tüm Oturumları Kapat</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Güvenlik Politikası Kartı */}
            <div className="bg-[var(--theme-card)]/80 border border-[var(--theme-border)] rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-2">
                    <AlertOctagon className="w-4 h-4" />
                    <span>Güvenlik Mekanizması & Kurallar</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-white/70 pt-3 border-t border-white/10">
                    <div>
                        <strong className="text-white block mb-1">1. Oturum Zaman Aşımı</strong>
                        Her işlemde <code className="text-[var(--theme-accent)]">son_aktivite</code> saati güncellenir. 30 dakika hareketsizlikte oturum düşer.
                    </div>
                    <div>
                        <strong className="text-white block mb-1">2. Maksimum Süre</strong>
                        Giriş yapıldıktan sonra en fazla 2 saat sonra çerez ve veritabanı kaydı sonlanır.
                    </div>
                    <div>
                        <strong className="text-white block mb-1">3. Cihaz İmzası</strong>
                        Giriş yapıldığında istemcinin User-Agent başlığı kaydedilir ve bu sayfada listelenir.
                    </div>
                </div>
            </div>

            {/* Oturumlar Tablosu */}
            <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-white">
                        Açık Oturumlar ({oturumlar.length})
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        Oturum Çerezi: <code className="text-indigo-300">admin_token</code> (httpOnly, secure, sameSite)
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">Cihaz / Tarayıcı</th>
                                <th className="p-3.5">Son Aktivite (30 dk zaman aşımı)</th>
                                <th className="p-3.5">Bitiş Zamanı</th>
                                <th className="p-3.5 text-right">Durum</th>
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
                                                        {o.cihaz || 'Bilinmeyen Cihaz / Tarayıcı'}
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
                                                <span>{new Date(o.son_aktivite).toLocaleString('tr-TR')}</span>
                                            </div>
                                        </td>
                                        <td className="p-3.5 text-white/50">
                                            {new Date(o.bitis).toLocaleString('tr-TR')}
                                        </td>
                                        <td className="p-3.5 text-right whitespace-nowrap">
                                            {buCihazMi ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    <span>Bu Cihaz (Aktif)</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--theme-surface)] text-white/50 border border-white/10">
                                                    <span>Diğer Oturum</span>
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
