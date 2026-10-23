import React from 'react';
import Link from 'next/link';
import { sql } from '@/lib/db';
import { Trophy, ArrowRight, Sparkles } from 'lucide-react';

interface OdulKaydi {
    id: number;
    ad: string;
    veren_kurum?: string | null;
    tarih?: string | null;
    derece?: number | null;
    aciklama?: string | null;
    kategori_id?: number | null;
    kategori_adi?: string | null;
    yayinda?: boolean;
    olusturma?: string;
}

export async function HomeAwardsTeaser() {
    let awards: OdulKaydi[] = [];

    try {
        // Görev 3.2 sorgusu: En yeni 4 ödülü listele (yayinda = true)
        const rows = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST
            LIMIT 4
        `;
        awards = rows as unknown as OdulKaydi[];
    } catch (err) {
        console.error('HomeAwardsTeaser veritabanı sorgu hatası:', err);
    }

    if (!awards || awards.length === 0) {
        return null;
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="rounded-2xl border border-[var(--theme-border,#1e293b)] bg-[var(--theme-card,#0f172a)] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-mono text-xs border border-amber-500/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>ÖNE ÇIKANLAR (GÖREV 3.2)</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-amber-400" />
                            <span>Ödüller ve Başarılar</span>
                        </h3>
                        <p className="text-xs text-white/60 font-sans">
                            PostgreSQL (<code className="text-emerald-400">oduller</code> tablosu) üzerinden canlı listelenen en yeni başarılar.
                        </p>
                    </div>

                    <Link
                        href="/oduller"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--theme-accent,#00ff66)] hover:underline"
                    >
                        <span>Tümünü Gör ({awards.length}+)</span>
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
                                        {award.kategori_adi || 'Başarı'}
                                    </span>
                                    {award.derece && (
                                        <span className="font-bold text-amber-300">
                                            {award.derece === 1 ? '🥇 1.lik' : `${award.derece}.`}
                                        </span>
                                    )}
                                </div>
                                <h4 className="text-sm font-bold text-white font-mono group-hover:text-amber-300 transition-colors line-clamp-2">
                                    {award.ad}
                                </h4>
                                {award.aciklama && (
                                    <p className="text-xs text-white/70 line-clamp-2 font-sans">
                                        {award.aciklama}
                                    </p>
                                )}
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/50">
                                <span>{award.veren_kurum || '-'}</span>
                                <span>{award.tarih ? new Date(award.tarih).getFullYear() : '-'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
