import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import {
    Mail,
    Trash2,
    ShieldAlert,
    History,
    Check,
    Calendar
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface MesajRow {
    id: number;
    ad_soyad: string;
    eposta: string;
    mesaj: string;
    kvkk_onay: boolean;
    okundu: boolean;
    gonderim_zamani: string;
}

interface ImhaRow {
    id: number;
    adet: number;
    zaman: string;
}

// Server Action: Okundu Olarak İşaretle (UPDATE) - Görev 4.6
async function okunduYapAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    if (!id) return;

    await sql`UPDATE iletisim_mesajlari SET okundu = true WHERE id = ${id}`;
    revalidatePath('/admin/mesajlar');
    revalidatePath('/admin');
}

// Server Action: Mesaj Sil (DELETE) - Görev 4.6
async function mesajSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    if (!id) return;

    await sql`DELETE FROM iletisim_mesajlari WHERE id = ${id}`;
    revalidatePath('/admin/mesajlar');
    revalidatePath('/admin');
}

// Server Action: Görev 7 - 1 Yıldan Eski Mesajları Anonimleştir ve İmha Kaydına Yaz (WITH ... RETURNING)
async function anonimlestirAction() {
    'use server';
    await requireAdmin();

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS imha_kayitlari (
                id SERIAL PRIMARY KEY,
                adet INT NOT NULL,
                zaman TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `;

        await sql`
            WITH anonimlestirilenler AS (
                UPDATE iletisim_mesajlari
                SET ad_soyad = 'Anonim',
                    eposta = 'anonim@example.invalid',
                    mesaj = '[anonimleştirildi]'
                WHERE gonderim_zamani < now() - interval '1 year'
                RETURNING id
            )
            INSERT INTO imha_kayitlari (adet, zaman)
            SELECT COUNT(*), now() FROM anonimlestirilenler;
        `;
    } catch (err) {
        console.error('Anonimleştirme işlemi hatası:', err);
    }

    revalidatePath('/admin/mesajlar');
}

export default async function MesajlarPage() {
    await requireAdmin();

    let mesajlar: MesajRow[] = [];
    let imhaKayitlari: ImhaRow[] = [];

    try {
        const rows = await sql`
            SELECT * FROM iletisim_mesajlari 
            ORDER BY gonderim_zamani DESC
        `;
        mesajlar = rows as unknown as MesajRow[];
    } catch (e) {
        console.error('Mesajlar çekilemedi:', e);
    }

    try {
        const imhaRows = await sql`
            SELECT * FROM imha_kayitlari 
            ORDER BY zaman DESC LIMIT 5
        `;
        imhaKayitlari = imhaRows as unknown as ImhaRow[];
    } catch {
        imhaKayitlari = [];
    }

    const okunmamisSayisi = mesajlar.filter((m) => !m.okundu).length;

    return (
        <div className="space-y-8">
            {/* Sayfa Başlığı ve Aksiyonlar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <Mail className="w-6 h-6 text-sky-400" />
                        <span>Gelen İletişim Mesajları</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        Sitedeki iletişim formundan iletilen mesajlar (<code className="text-[var(--theme-accent)]">iletisim_mesajlari</code> tablosu).
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
                        Toplam: <strong className="text-white">{mesajlar.length}</strong> | Okunmamış:{' '}
                        <strong className={okunmamisSayisi > 0 ? 'text-red-400' : 'text-emerald-400'}>
                            {okunmamisSayisi}
                        </strong>
                    </div>

                    {/* Görev 7: Hukuki Yükümlülük Düğmesi */}
                    <form action={anonimlestirAction}>
                        <button
                            type="submit"
                            title="1 yıldan eski mesajları KVKK md. 7 gereğince anonimleştirir"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
                        >
                            <ShieldAlert className="w-4 h-4" />
                            <span>Süresi Dolan Mesajları Anonimleştir (KVKK)</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Görev 7: Hukuk & İmha Günlüğü Bilgilendirme Kutusu */}
            <div className="bg-[var(--theme-card)]/80 border border-[var(--theme-border)] rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <History className="w-4 h-4" />
                    <span>KVKK md. 7 Saklama ve İmha Politikası Durumu</span>
                </div>
                <p className="text-xs font-mono text-white/70 leading-relaxed">
                    İletişim formunda alınan kişisel veriler en fazla <strong>1 yıl</strong> süreyle saklanır.
                    Süresi dolan mesajlar yukarıdaki düğmeye tıklandığında anonimleştirilir ve işlem{' '}
                    <code className="text-amber-300">imha_kayitlari</code> tablosuna kaydedilir.
                </p>

                {imhaKayitlari && imhaKayitlari.length > 0 && (
                    <div className="pt-2 border-t border-white/10">
                        <div className="text-[11px] font-mono font-semibold text-white/80 mb-2">
                            Son İmha / Anonimleştirme Kayıtları:
                        </div>
                        <div className="space-y-1.5">
                            {imhaKayitlari.map((k) => (
                                <div
                                    key={k.id}
                                    className="text-xs font-mono bg-[var(--theme-surface)] border border-white/10 px-3 py-1.5 rounded-lg text-white/80 flex items-center justify-between"
                                >
                                    <span>
                                        İşlem #{k.id}: <strong>{k.adet}</strong> kayıt başarıyla anonimleştirildi.
                                    </span>
                                    <span className="text-white/40 text-[11px]">
                                        {new Date(k.zaman).toLocaleString('tr-TR')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mesaj Listesi */}
            {mesajlar.length === 0 ? (
                <div className="bg-[var(--theme-card)]/60 border border-[var(--theme-border)] rounded-2xl p-12 text-center text-white/40 font-mono text-xs">
                    Henüz gelen bir iletişim mesajı bulunmamaktadır.
                </div>
            ) : (
                <div className="space-y-4">
                    {mesajlar.map((m) => {
                        const isAnonim = m.ad_soyad === 'Anonim';
                        return (
                            <div
                                key={m.id}
                                className={`p-5 rounded-2xl border transition-all ${
                                    !m.okundu
                                        ? 'bg-sky-950/20 border-sky-500/50 shadow-lg shadow-sky-950/20'
                                        : 'bg-[var(--theme-card)]/90 border-[var(--theme-border)]'
                                }`}
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2.5">
                                            <span className="font-mono font-bold text-sm text-white">
                                                {m.ad_soyad}
                                            </span>
                                            {isAnonim && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                                    Anonimleştirilmiş Veri
                                                </span>
                                            )}
                                            {m.kvkk_onay && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                                    KVKK Onaylı
                                                </span>
                                            )}
                                            {!m.okundu && (
                                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 animate-pulse">
                                                    Yeni
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs font-mono text-white/60">
                                            {m.eposta}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{new Date(m.gonderim_zamani).toLocaleString('tr-TR')}</span>
                                    </div>
                                </div>

                                {/* Mesaj İçeriği */}
                                <div className="p-3.5 rounded-xl bg-[var(--theme-surface)]/80 border border-white/10 text-xs font-mono text-white/90 whitespace-pre-wrap leading-relaxed mb-4">
                                    {m.mesaj}
                                </div>

                                {/* Alt Eylem Butonları */}
                                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                                    <div>
                                        <span className="text-white/40">Kayıt ID: #{m.id}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!m.okundu && (
                                            <form action={okunduYapAction}>
                                                <input type="hidden" name="id" value={m.id} />
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium transition-colors cursor-pointer"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                    <span>Okundu İşaretle</span>
                                                </button>
                                            </form>
                                        )}

                                        <form action={mesajSilAction}>
                                            <input type="hidden" name="id" value={m.id} />
                                            <button
                                                type="submit"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-red-500/20 hover:text-red-400 text-white/60 border border-white/10 transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Sil</span>
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
