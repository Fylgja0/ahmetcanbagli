import React from 'react';
import { sql } from '@/lib/db';
import Link from 'next/link';
import { Award, Mail, Shield, ArrowUpRight, CheckCircle2, AlertTriangle, Database, FolderGit2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
    let toplamOdul = 0;
    let toplamProje = 0;
    let toplamMesaj = 0;
    let okunmamisMesaj = 0;
    let aktifOturum = 1;

    try {
        const [odulCountRes, projeCountRes, mesajCountRes, okunmamisCountRes, oturumCountRes] = await Promise.all([
            sql`SELECT COUNT(*)::int AS toplam FROM oduller`,
            sql`SELECT COUNT(*)::int AS toplam FROM projeler`.catch(() => [{ toplam: 0 }]),
            sql`SELECT COUNT(*)::int AS toplam FROM iletisim_mesajlari`,
            sql`SELECT COUNT(*)::int AS okunmamis FROM iletisim_mesajlari WHERE okundu = false`,
            sql`SELECT COUNT(*)::int AS aktif_oturum FROM oturumlar WHERE bitis > now() AND son_aktivite > now() - interval '30 minutes'`
        ]);

        toplamOdul = odulCountRes[0]?.toplam || 0;
        toplamProje = projeCountRes[0]?.toplam || 0;
        toplamMesaj = mesajCountRes[0]?.toplam || 0;
        okunmamisMesaj = okunmamisCountRes[0]?.okunmamis || 0;
        aktifOturum = oturumCountRes[0]?.aktif_oturum || 1;
    } catch (e) {
        console.error('İstatistikler çekilemedi:', e);
    }

    return (
        <div className="space-y-8">
            {/* Karşılama Başlığı */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white flex items-center gap-3">
                    <Database className="w-7 h-7 text-[var(--theme-accent)]" />
                    <span>Sistem Özeti & Kontrol Paneli</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-white/60 mt-1">
                    PostgreSQL veritabanı aktif. Ödüller, mesajlar ve oturum durumları anlık senkronizedir.
                </p>
            </div>

            {/* İstatistik Kartları Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Ödüller ve Başarılar Kartı (Ödev COUNT kuralı) */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Ödüller & Başarılar
                        </span>
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                            <Award className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                        {toplamOdul}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">oduller tablosu</span>
                        <Link
                            href="/admin/oduller"
                            className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                        >
                            <span>Yönet & Ekle</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 2. Projeler Kartı */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Projeler
                        </span>
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            <FolderGit2 className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-white mb-2">
                        {toplamProje}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">projeler tablosu</span>
                        <Link
                            href="/admin/projeler"
                            className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold"
                        >
                            <span>Projeleri Yönet</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 2. Okunmamış Mesajlar Kartı (Ödev COUNT kuralı) */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-sky-400/60 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Okunmamış Mesajlar
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
                        <span className="text-sm font-normal text-white/40 ml-2">/ {toplamMesaj} toplam</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">iletisim_mesajlari</span>
                        <Link
                            href="/admin/mesajlar"
                            className="inline-flex items-center gap-1 text-sky-400 hover:underline font-semibold"
                        >
                            <span>Mesajları Aç</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* 3. Aktif Oturumlar Kartı (Görev 6 Güvenlik) */}
                <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl p-6 relative overflow-hidden group hover:border-[var(--theme-accent)] transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-medium text-white/60 uppercase tracking-wider">
                            Aktif Oturumlar
                        </span>
                        <div className="p-2.5 rounded-xl bg-[var(--theme-badge-bg)] border border-[var(--theme-border)] text-[var(--theme-accent)]">
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold font-mono text-[var(--theme-accent)] mb-2">
                        {aktifOturum}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                        <span className="text-white/40">30 dk zaman aşımı</span>
                        <Link
                            href="/admin/oturumlar"
                            className="inline-flex items-center gap-1 text-[var(--theme-accent)] hover:underline font-semibold"
                        >
                            <span>İncele</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hızlı Bilgilendirme ve Güvenlik/Hukuk Notları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-[var(--theme-accent)] mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Görev 6 Güvenlik Durumu</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• Oturum çerezleri <strong>httpOnly</strong>, <strong>secure</strong> ve <strong>sameSite: lax</strong> korumalıdır.</li>
                        <li>• 30 dakika hareketsiz kalan oturumlar otomatik olarak sonlandırılır.</li>
                        <li>• Tüm SQL sorguları tagged template literal ile parameterized çalışır; SQL injection korumalıdır.</li>
                    </ul>
                </div>

                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-400 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Görev 7 Hukuk & KVKK Durumu</span>
                    </div>
                    <ul className="text-xs font-mono text-white/70 space-y-2">
                        <li>• İletişim mesajlarında 1 yıllık saklama süresi uygulanmaktadır.</li>
                        <li>• Mesajlar sekmesinden tek tıkla 1 yılı aşan mesajlar anonimleştirilebilir.</li>
                        <li>• Anonimleştirilen adet bilgisi <strong>imha_kayitlari</strong> tablosuna yazılır.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
