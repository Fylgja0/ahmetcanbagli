import React from 'react';
import { sql } from '@/lib/db';
import Link from 'next/link';
import {
    Trophy,
    Award,
    Calendar,
    Building2,
    Tag,
    Sparkles,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

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

export default async function OdullerPage() {
    let oduller: OdulKaydi[] = [];
    let oneCikanlar: OdulKaydi[] = [];

    try {
        // Görev 5 kuralı: Yalnızca yayinda = true olan kayıtlar gösterilsin
        const tumKayitlar = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST, o.id DESC
        `;
        oduller = tumKayitlar as unknown as OdulKaydi[];

        // Görev 3.2 sorgusu kullanılarak oluşturulan "Öne Çıkanlar" (En yeni 4 ödül)
        const enYeniDort = await sql`
            SELECT o.*, ot.ad AS kategori_adi 
            FROM oduller o
            LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
            WHERE o.yayinda = true
            ORDER BY o.tarih DESC NULLS LAST
            LIMIT 4
        `;
        oneCikanlar = enYeniDort as unknown as OdulKaydi[];
    } catch (err) {
        console.error('Ödüller veritabanından çekilirken hata:', err);
    }

    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            {/* Üst Navigasyon / Geri Dönüş */}
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-[var(--theme-accent,#00ff66)] transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Ana Sayfaya Dön</span>
                </Link>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Veritabanından Canlı Veri (PostgreSQL/Neon)</span>
                </div>
            </div>

            {/* Başlık Bölümü */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>07_AWARDS & HONORS</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
                    Ödüller ve Başarılar
                </h1>
                <p className="text-sm text-white/60 font-sans leading-relaxed">
                    Yarışmalar, hackathonlar, akademik başarılar ve burslar. Yönetim panelinden eklenen yeni ödüller bu sayfada anında canlı yayınlanır.
                </p>
            </div>

            {/* Görev 3.2: Öne Çıkanlar Alanı */}
            {oneCikanlar.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Öne Çıkan Başarılar (En Yeni 4 Ödül)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {oneCikanlar.map((item, idx) => (
                            <div
                                key={item.id}
                                className="relative p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[var(--theme-card,#0f172a)] to-[var(--theme-surface,#020617)] shadow-lg shadow-amber-950/20 flex flex-col justify-between group hover:border-amber-400/60 transition-all"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                                            #{idx + 1} ÖNE ÇIKAN
                                        </span>
                                        {item.derece && (
                                            <span className="text-xs font-mono font-bold text-amber-400">
                                                {item.derece === 1 ? '🥇 1.lik' : `${item.derece}. Derece`}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-white font-mono leading-snug group-hover:text-amber-300 transition-colors">
                                        {item.ad}
                                    </h3>

                                    {item.aciklama && (
                                        <p className="text-xs text-white/70 line-clamp-3 font-sans leading-relaxed">
                                            {item.aciklama}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
                                    <span>{item.veren_kurum || 'MCBÜ'}</span>
                                    <span>{item.tarih ? new Date(item.tarih).getFullYear() : '-'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tüm Ödüller Bölümü */}
            <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-[var(--theme-accent,#00ff66)]" />
                        <span>Tüm Başarı Listesi ({oduller.length})</span>
                    </h2>
                    <span className="text-xs font-mono text-white/50">
                        {oduller.length} kayıt listeleniyor
                    </span>
                </div>

                {oduller.length === 0 ? (
                    <div className="p-12 text-center rounded-2xl border border-white/10 bg-[var(--theme-card,#0f172a)] text-white/60 font-mono text-xs">
                        Şu anda yayında olan ödül bulunmuyor. Yönetim panelinden kayıt ekleyebilirsiniz.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {oduller.map((o) => (
                            <div
                                key={o.id}
                                className="p-6 rounded-2xl border border-[var(--theme-border,#1e293b)] bg-[var(--theme-card,#0f172a)] hover:border-[var(--theme-accent,#00ff66)] transition-all flex flex-col justify-between group shadow-xl"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-2">
                                        {o.kategori_adi ? (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--theme-surface,#020617)] text-[var(--theme-accent,#00ff66)] border border-white/10">
                                                <Tag className="w-3 h-3" />
                                                <span>{o.kategori_adi}</span>
                                            </span>
                                        ) : (
                                            <span />
                                        )}

                                        {o.derece && (
                                            <span className="text-xs font-mono font-bold text-amber-400">
                                                {o.derece === 1 ? '🥇 1.lik Ödülü' : `${o.derece}. Derece`}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-white font-mono group-hover:text-[var(--theme-accent,#00ff66)] transition-colors">
                                        {o.ad}
                                    </h3>

                                    {o.aciklama && (
                                        <p className="text-xs text-white/70 font-sans leading-relaxed">
                                            {o.aciklama}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-white/50">
                                    {o.veren_kurum && (
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-3.5 h-3.5 text-white/40" />
                                            <span>{o.veren_kurum}</span>
                                        </div>
                                    )}

                                    {o.tarih && (
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-white/40" />
                                            <span>{new Date(o.tarih).toLocaleDateString('tr-TR')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
