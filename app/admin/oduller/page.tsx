import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    PlusCircle,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    Tag,
    Trophy,
    X
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface OdullerPageProps {
    searchParams?: Promise<{ edit?: string }>;
}

interface OdulRow {
    id: number;
    ad: string;
    veren_kurum: string | null;
    tarih: string | null;
    derece: number | null;
    aciklama: string | null;
    kategori_id: number | null;
    kategori_adi?: string | null;
    yayinda: boolean;
}

interface KategoriRow {
    id: number;
    ad: string;
}

// Server Action: Yeni Ödül Ekle (INSERT) - Görev 4.5
async function odulEkleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const ad = formData.get('ad')?.toString().trim();
    const veren_kurum = formData.get('veren_kurum')?.toString().trim() || null;
    const tarih = formData.get('tarih')?.toString() || null;
    const dereceRaw = formData.get('derece')?.toString().trim();
    const derece = dereceRaw ? parseInt(dereceRaw, 10) : null;
    const aciklama = formData.get('aciklama')?.toString().trim() || null;
    const kategoriIdRaw = formData.get('kategori_id')?.toString().trim();
    const kategori_id = kategoriIdRaw ? parseInt(kategoriIdRaw, 10) : null;

    if (!ad) return;

    await sql`
        INSERT INTO oduller (ad, veren_kurum, tarih, derece, aciklama, kategori_id, yayinda)
        VALUES (${ad}, ${veren_kurum}, ${tarih}, ${derece}, ${aciklama}, ${kategori_id}, true)
    `;

    revalidatePath('/admin/oduller');
    revalidatePath('/admin');
    revalidatePath('/oduller');
    revalidatePath('/');
}

// Server Action: Ödül Güncelle (UPDATE) - Görev 4.5
async function odulGuncelleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const ad = formData.get('ad')?.toString().trim();
    const veren_kurum = formData.get('veren_kurum')?.toString().trim() || null;
    const tarih = formData.get('tarih')?.toString() || null;
    const dereceRaw = formData.get('derece')?.toString().trim();
    const derece = dereceRaw ? parseInt(dereceRaw, 10) : null;
    const aciklama = formData.get('aciklama')?.toString().trim() || null;
    const kategoriIdRaw = formData.get('kategori_id')?.toString().trim();
    const kategori_id = kategoriIdRaw ? parseInt(kategoriIdRaw, 10) : null;

    if (!id || !ad) return;

    await sql`
        UPDATE oduller
        SET ad = ${ad},
            veren_kurum = ${veren_kurum},
            tarih = ${tarih},
            derece = ${derece},
            aciklama = ${aciklama},
            kategori_id = ${kategori_id}
        WHERE id = ${id}
    `;

    revalidatePath('/admin/oduller');
    revalidatePath('/oduller');
    revalidatePath('/');
    redirect('/admin/oduller');
}

// Server Action: Yayında Durumunu Değiştir (UPDATE toggle) - Görev 4.5
async function toggleYayindaAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE oduller SET yayinda = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/oduller');
    revalidatePath('/oduller');
    revalidatePath('/');
}

// Server Action: Ödül Sil (DELETE) - Görev 4.5
async function odulSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    await sql`DELETE FROM oduller WHERE id = ${id}`;

    revalidatePath('/admin/oduller');
    revalidatePath('/admin');
    revalidatePath('/oduller');
    revalidatePath('/');
}

export default async function OdullerPage(props: OdullerPageProps) {
    await requireAdmin();

    const searchParams = await props.searchParams;
    const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

    let oduller: OdulRow[] = [];
    let kategoriler: KategoriRow[] = [];
    let editKayit: OdulRow | null = null;

    try {
        const [odulRes, katRes, editRes] = await Promise.all([
            sql`
                SELECT o.*, ot.ad AS kategori_adi 
                FROM oduller o
                LEFT JOIN odul_turleri ot ON ot.id = o.kategori_id
                ORDER BY o.tarih DESC NULLS LAST, o.id DESC
            `,
            sql`SELECT * FROM odul_turleri ORDER BY ad ASC`,
            editId ? sql`SELECT * FROM oduller WHERE id = ${editId}` : Promise.resolve([])
        ]);

        oduller = odulRes as unknown as OdulRow[];
        kategoriler = katRes as unknown as KategoriRow[];
        editKayit = (editRes?.[0] as unknown as OdulRow) || null;
    } catch (e) {
        console.error('Ödüller yüklenirken hata:', e);
    }

    const formatDateForInput = (d: string | null) => {
        if (!d) return '';
        try {
            return new Date(d).toISOString().split('T')[0];
        } catch {
            return '';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <Trophy className="w-6 h-6 text-amber-400" />
                        <span>Ödüller ve Başarılar Yönetimi</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        Veritabanındaki <code className="text-[var(--theme-accent)]">oduller</code> tablosu kayıtları (odul_turleri JOIN ile).
                    </p>
                </div>

                <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
                    Toplam: <strong className="text-white">{oduller.length}</strong> kayıt
                </div>
            </div>

            {/* Yeni Ekleme veya Düzenleme Formu (INSERT & UPDATE) */}
            <div className={`p-6 rounded-2xl border transition-all shadow-xl ${
                editKayit
                    ? 'bg-amber-950/20 border-amber-500/50'
                    : 'bg-[var(--theme-card)]/90 border-[var(--theme-border)]'
            }`}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
                        {editKayit ? (
                            <>
                                <Edit3 className="w-5 h-5 text-amber-400" />
                                <span>Ödülü Düzenle (ID: #{editKayit.id})</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                                <span>Yeni Ödül / Başarı Ekle</span>
                            </>
                        )}
                    </h2>

                    {editKayit && (
                        <Link
                            href="/admin/oduller"
                            className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>Düzenlemeyi İptal Et</span>
                        </Link>
                    )}
                </div>

                <form action={editKayit ? odulGuncelleAction : odulEkleAction} className="space-y-4 font-mono text-xs">
                    {editKayit && <input type="hidden" name="id" value={editKayit.id} />}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Başlık */}
                        <div className="lg:col-span-2">
                            <label className="block text-white/80 font-medium mb-1.5">
                                Ödül / Başarı Başlığı *
                            </label>
                            <input
                                type="text"
                                name="ad"
                                required
                                defaultValue={editKayit?.ad || ''}
                                placeholder="Örn: Bilişim Vadisi Hackathon 1.lik Ödülü (2516016010)"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Kategori Seçimi (odul_turleri JOIN) */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Kategori
                            </label>
                            <select
                                name="kategori_id"
                                defaultValue={editKayit?.kategori_id || ''}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] cursor-pointer"
                            >
                                <option value="">Kategori Seçilmedi</option>
                                {kategoriler.map((k) => (
                                    <option key={k.id} value={k.id} className="bg-slate-900 text-white">
                                        {k.ad}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Veren Kurum */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Veren Kurum / Organizasyon
                            </label>
                            <input
                                type="text"
                                name="veren_kurum"
                                defaultValue={editKayit?.veren_kurum || ''}
                                placeholder="Örn: TÜBİTAK, IEEE, MCBÜ"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Tarih */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Tarih
                            </label>
                            <input
                                type="date"
                                name="tarih"
                                defaultValue={formatDateForInput(editKayit?.tarih || null)}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] cursor-pointer"
                            />
                        </div>

                        {/* Derece */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Derece (Sayısal)
                            </label>
                            <input
                                type="number"
                                name="derece"
                                min="1"
                                defaultValue={editKayit?.derece ?? ''}
                                placeholder="Örn: 1 (Birincilik)"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>
                    </div>

                    {/* Açıklama */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            Detaylı Açıklama
                        </label>
                        <textarea
                            name="aciklama"
                            rows={3}
                            defaultValue={editKayit?.aciklama || ''}
                            placeholder="Başarı hakkında kısa detaylar, proje bilgisi vb."
                            className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] resize-y"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-lg ${
                                editKayit
                                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                    : 'bg-[var(--theme-accent)] hover:opacity-90 text-black'
                            }`}
                        >
                            {editKayit ? 'Değişiklikleri Kaydet (UPDATE)' : 'Yeni Ödülü Ekle (INSERT)'}
                        </button>

                        {editKayit && (
                            <Link
                                href="/admin/oduller"
                                className="px-4 py-2.5 rounded-lg text-xs font-mono font-medium bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 transition-colors"
                            >
                                Vazgeç
                            </Link>
                        )}
                    </div>
                </form>
            </div>

            {/* Kayıtlar Listesi Tablosu */}
            <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-white">
                        Mevcut Ödül & Başarı Kayıtları
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        Sitede sadece &quot;Yayında&quot; olanlar görüntülenir
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">ID</th>
                                <th className="p-3.5">Ödül Başlığı</th>
                                <th className="p-3.5">Kategori</th>
                                <th className="p-3.5">Veren Kurum</th>
                                <th className="p-3.5">Tarih</th>
                                <th className="p-3.5">Derece</th>
                                <th className="p-3.5 text-center">Durum</th>
                                <th className="p-3.5 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {oduller.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-white/40">
                                        Henüz kayıtlı ödül bulunmuyor. Yukarıdaki formdan ilk kaydı ekleyebilirsiniz.
                                    </td>
                                </tr>
                            ) : (
                                oduller.map((o) => (
                                    <tr
                                        key={o.id}
                                        className={`hover:bg-white/5 transition-colors ${
                                            editKayit?.id === o.id ? 'bg-amber-500/10' : ''
                                        }`}
                                    >
                                        <td className="p-3.5 font-bold text-white/40">#{o.id}</td>
                                        <td className="p-3.5 font-medium text-white max-w-xs break-words">
                                            {o.ad}
                                            {o.aciklama && (
                                                <span className="block text-[11px] text-white/50 font-sans mt-0.5 line-clamp-1">
                                                    {o.aciklama}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3.5">
                                            {o.kategori_adi ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--theme-surface)] text-white/80 border border-white/10">
                                                    <Tag className="w-3 h-3 text-[var(--theme-accent)]" />
                                                    <span>{o.kategori_adi}</span>
                                                </span>
                                            ) : (
                                                <span className="text-white/30">-</span>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-white/70">
                                            {o.veren_kurum || <span className="text-white/30">-</span>}
                                        </td>
                                        <td className="p-3.5 text-white/50">
                                            {o.tarih ? new Date(o.tarih).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td className="p-3.5">
                                            {o.derece ? (
                                                <span className="font-bold text-amber-400">
                                                    {o.derece === 1 ? '🥇 1.' : `${o.derece}.`}
                                                </span>
                                            ) : (
                                                <span className="text-white/30">-</span>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-center">
                                            {/* Yayında / Taslak Toggle Düğmesi (Görev 4.5) */}
                                            <form action={toggleYayindaAction} className="inline-block">
                                                <input type="hidden" name="id" value={o.id} />
                                                <input type="hidden" name="mevcut" value={o.yayinda ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={o.yayinda ? 'Yayından kaldır' : 'Yayına al'}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                                                        o.yayinda
                                                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                                                            : 'bg-[var(--theme-surface)] text-white/50 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {o.yayinda ? (
                                                        <>
                                                            <Eye className="w-3 h-3" />
                                                            <span>Yayında</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="w-3 h-3" />
                                                            <span>Taslak</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </td>
                                        <td className="p-3.5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Düzenleme Linki (UPDATE moduna alır) */}
                                                <Link
                                                    href={`/admin/oduller?edit=${o.id}`}
                                                    className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-amber-500/20 hover:text-amber-300 text-white/70 border border-[var(--theme-border)] transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* Silme Düğmesi (DELETE) */}
                                                <form action={odulSilAction} className="inline-block">
                                                    <input type="hidden" name="id" value={o.id} />
                                                    <button
                                                        type="submit"
                                                        title="Sil"
                                                        className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-red-500/20 hover:text-red-400 text-white/70 border border-white/10 transition-colors cursor-pointer"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
