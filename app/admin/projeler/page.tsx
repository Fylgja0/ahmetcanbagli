import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ensureDefaultProjectsSeeded } from '@/app/actions/projects';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
    PlusCircle,
    Edit3,
    Trash2,
    Eye,
    EyeOff,
    Star,
    Github,
    ExternalLink,
    FolderGit2,
    X,
    Layers
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ProjelerPageProps {
    searchParams?: Promise<{ edit?: string }>;
}

interface ProjeRow {
    id: number;
    baslik: string;
    kategori: string;
    github_url: string | null;
    canli_url: string | null;
    teknolojiler: string | null;
    aciklama: string;
    detay: string | null;
    one_cikan: boolean;
    sira: number;
    yayinda: boolean;
    olusturma: string;
}

// Server Action: Yeni Proje Ekle (INSERT)
async function projeEkleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const baslik = formData.get('baslik')?.toString().trim();
    const kategori = formData.get('kategori')?.toString().trim() || 'backend';
    const github_url = formData.get('github_url')?.toString().trim() || null;
    const canli_url = formData.get('canli_url')?.toString().trim() || null;
    const teknolojiler = formData.get('teknolojiler')?.toString().trim() || null;
    const aciklama = formData.get('aciklama')?.toString().trim();
    const detay = formData.get('detay')?.toString().trim() || null;
    const one_cikan = formData.get('one_cikan') === 'on' || formData.get('one_cikan') === 'true';
    const sira = parseInt(formData.get('sira')?.toString() || '0', 10);

    if (!baslik || !aciklama) return;

    // Otomatik slug üretimi (Türkçe karakterleri dönüştürerek)
    const slug = baslik
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `proje-${Date.now()}`;

    await sql`
        INSERT INTO projeler (slug, baslik, kategori, github_url, canli_url, teknolojiler, aciklama, detay, one_cikan, sira, yayinda)
        VALUES (${slug}, ${baslik}, ${kategori}, ${github_url}, ${canli_url}, ${teknolojiler}, ${aciklama}, ${detay}, ${one_cikan}, ${sira}, true)
    `;

    revalidatePath('/admin/projeler');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Proje Güncelle (UPDATE)
async function projeGuncelleAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const baslik = formData.get('baslik')?.toString().trim();
    const kategori = formData.get('kategori')?.toString().trim() || 'backend';
    const github_url = formData.get('github_url')?.toString().trim() || null;
    const canli_url = formData.get('canli_url')?.toString().trim() || null;
    const teknolojiler = formData.get('teknolojiler')?.toString().trim() || null;
    const aciklama = formData.get('aciklama')?.toString().trim();
    const detay = formData.get('detay')?.toString().trim() || null;
    const one_cikan = formData.get('one_cikan') === 'on' || formData.get('one_cikan') === 'true';
    const sira = parseInt(formData.get('sira')?.toString() || '0', 10);

    if (!id || !baslik || !aciklama) return;

    await sql`
        UPDATE projeler
        SET baslik = ${baslik},
            kategori = ${kategori},
            github_url = ${github_url},
            canli_url = ${canli_url},
            teknolojiler = ${teknolojiler},
            aciklama = ${aciklama},
            detay = ${detay},
            one_cikan = ${one_cikan},
            sira = ${sira}
        WHERE id = ${id}
    `;

    revalidatePath('/admin/projeler');
    revalidatePath('/projects');
    revalidatePath('/');
    redirect('/admin/projeler');
}

// Server Action: Yayında Durumunu Değiştir
async function toggleYayindaAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE projeler SET yayinda = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/projeler');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Öne Çıkarılan Durumunu Değiştir
async function toggleOneCikanAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    const mevcutDurum = formData.get('mevcut') === 'true';

    await sql`UPDATE projeler SET one_cikan = ${!mevcutDurum} WHERE id = ${id}`;

    revalidatePath('/admin/projeler');
    revalidatePath('/projects');
    revalidatePath('/');
}

// Server Action: Proje Sil (DELETE)
async function projeSilAction(formData: FormData) {
    'use server';
    await requireAdmin();

    const id = parseInt(formData.get('id')?.toString() || '0', 10);
    await sql`DELETE FROM projeler WHERE id = ${id}`;

    revalidatePath('/admin/projeler');
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath('/');
}

export default async function ProjelerPage(props: ProjelerPageProps) {
    await requireAdmin();

    const searchParams = await props.searchParams;
    const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

    let projeler: ProjeRow[] = [];
    let editKayit: ProjeRow | null = null;

    try {
        await ensureDefaultProjectsSeeded();

        const [projeRes, editRes] = await Promise.all([
            sql`SELECT * FROM projeler ORDER BY sira ASC, id ASC`,
            editId ? sql`SELECT * FROM projeler WHERE id = ${editId}` : Promise.resolve([])
        ]);

        projeler = projeRes as unknown as ProjeRow[];
        editKayit = (editRes?.[0] as unknown as ProjeRow) || null;
    } catch (e) {
        console.error('Projeler yüklenirken hata:', e);
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <FolderGit2 className="w-6 h-6 text-emerald-400" />
                        <span>Projeler Yönetimi</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        Veritabanındaki <code className="text-[var(--theme-accent)]">projeler</code> tablosu. Yeni eklenen projeler sitede anında listelenir.
                    </p>
                </div>

                <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
                    Toplam: <strong className="text-white">{projeler.length}</strong> proje
                </div>
            </div>

            {/* Yeni Ekleme veya Düzenleme Formu */}
            <div className={`p-6 rounded-2xl border transition-all shadow-xl ${
                editKayit
                    ? 'bg-emerald-950/20 border-emerald-500/50'
                    : 'bg-[var(--theme-card)]/90 border-[var(--theme-border)]'
            }`}>
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
                        {editKayit ? (
                            <>
                                <Edit3 className="w-5 h-5 text-emerald-400" />
                                <span>Projeyi Düzenle (ID: #{editKayit.id})</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                                <span>Yeni Proje Ekle</span>
                            </>
                        )}
                    </h2>

                    {editKayit && (
                        <Link
                            href="/admin/projeler"
                            className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>Düzenlemeyi İptal Et</span>
                        </Link>
                    )}
                </div>

                <form action={editKayit ? projeGuncelleAction : projeEkleAction} className="space-y-4 font-mono text-xs">
                    {editKayit && <input type="hidden" name="id" value={editKayit.id} />}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Başlık */}
                        <div className="lg:col-span-2">
                            <label className="block text-white/80 font-medium mb-1.5">
                                Proje Başlığı *
                            </label>
                            <input
                                type="text"
                                name="baslik"
                                required
                                defaultValue={editKayit?.baslik || ''}
                                placeholder="Örn: Car Management System"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Kategori
                            </label>
                            <select
                                name="kategori"
                                defaultValue={editKayit?.kategori || 'backend'}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] cursor-pointer"
                            >
                                <option value="backend" className="bg-slate-900 text-white">Backend & Veritabanı</option>
                                <option value="datascience" className="bg-slate-900 text-white">Veri Bilimi & ML</option>
                                <option value="fullstack" className="bg-slate-900 text-white">Full Stack & Web</option>
                                <option value="mobile" className="bg-slate-900 text-white">Mobil & Sistem</option>
                            </select>
                        </div>

                        {/* GitHub URL */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                GitHub Depo Bağlantısı
                            </label>
                            <input
                                type="url"
                                name="github_url"
                                defaultValue={editKayit?.github_url || ''}
                                placeholder="https://github.com/Fylgja0/proje-adi"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Canlı Demo URL */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Canlı Demo / Yayın Bağlantısı (Opsiyonel)
                            </label>
                            <input
                                type="url"
                                name="canli_url"
                                defaultValue={editKayit?.canli_url || ''}
                                placeholder="https://demo.ornek.com"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Teknolojiler */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                Kullanılan Teknolojiler (Virgülle ayırın)
                            </label>
                            <input
                                type="text"
                                name="teknolojiler"
                                defaultValue={editKayit?.teknolojiler || ''}
                                placeholder="Örn: C#, .NET 10, EF Core 10, SQL Server"
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>
                    </div>

                    {/* Kısa Açıklama */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            Kısa Açıklama (Tagline) *
                        </label>
                        <input
                            type="text"
                            name="aciklama"
                            required
                            defaultValue={editKayit?.aciklama || ''}
                            placeholder="Projenin 1-2 cümlelik özeti ve temel amacı"
                            className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                    </div>

                    {/* Detaylı Açıklama */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            Detaylı Açıklama & Mimari Özeti
                        </label>
                        <textarea
                            name="detay"
                            rows={3}
                            defaultValue={editKayit?.detay || ''}
                            placeholder="Mimari katmanlar, kullanılan algoritmalar veya veritabanı yapısı hakkında detaylar"
                            className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] resize-y"
                        />
                    </div>

                    {/* Sıralama & Öne Çıkar Onayı */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-center">
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5 text-xs font-mono">
                                Listeleme Sırası (Küçük sayılar önce gösterilir)
                            </label>
                            <input
                                type="number"
                                name="sira"
                                defaultValue={editKayit?.sira ?? 0}
                                min={0}
                                max={999}
                                className="w-32 px-3 py-2 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white font-mono text-sm focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 cursor-pointer select-none mt-4 sm:mt-0">
                                <input
                                    type="checkbox"
                                    name="one_cikan"
                                    defaultChecked={editKayit ? editKayit.one_cikan : true}
                                    className="h-4 w-4 rounded border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-accent)] focus:ring-[var(--theme-accent)] cursor-pointer"
                                />
                                <span className="text-white/80 text-xs">
                                    Bu projeyi <strong>Öne Çıkanlar</strong> vitrininde göster
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-lg ${
                                editKayit
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                    : 'bg-[var(--theme-accent)] hover:opacity-90 text-black'
                            }`}
                        >
                            {editKayit ? 'Projeyi Güncelle (UPDATE)' : 'Yeni Projeyi Kaydet (INSERT)'}
                        </button>

                        {editKayit && (
                            <Link
                                href="/admin/projeler"
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
                    <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        <span>Mevcut Projeler Listesi</span>
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        Sitede sadece &quot;Yayında&quot; olan projeler görüntülenir
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">ID</th>
                                <th className="p-3.5">Proje Başlığı</th>
                                <th className="p-3.5">Kategori</th>
                                <th className="p-3.5">Teknolojiler</th>
                                <th className="p-3.5">Bağlantılar</th>
                                <th className="p-3.5 text-center">Öne Çıkan</th>
                                <th className="p-3.5 text-center">Durum</th>
                                <th className="p-3.5 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projeler.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-white/40">
                                        Henüz veritabanına eklenmiş proje bulunmuyor. Yukarıdaki formdan ilk projenizi ekleyebilirsiniz.
                                    </td>
                                </tr>
                            ) : (
                                projeler.map((p) => (
                                    <tr
                                        key={p.id}
                                        className={`hover:bg-white/5 transition-colors ${
                                            editKayit?.id === p.id ? 'bg-emerald-500/10' : ''
                                        }`}
                                    >
                                        <td className="p-3.5 font-bold text-white/40">#{p.id}</td>
                                        <td className="p-3.5 font-medium text-white max-w-xs break-words">
                                            {p.baslik}
                                            <span className="block text-[11px] text-white/50 font-sans mt-0.5 line-clamp-1">
                                                {p.aciklama}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--theme-surface)] text-white/80 border border-white/10 text-[11px]">
                                                {p.kategori === 'backend' ? 'Backend' : p.kategori === 'datascience' ? 'Veri Bilimi' : p.kategori}
                                            </span>
                                        </td>
                                        <td className="p-3.5 text-white/70 max-w-[200px] truncate">
                                            {p.teknolojiler || <span className="text-white/30">-</span>}
                                        </td>
                                        <td className="p-3.5">
                                            <div className="flex items-center gap-2">
                                                {p.github_url && (
                                                    <a
                                                        href={p.github_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-white/70 hover:text-white"
                                                        title="GitHub"
                                                    >
                                                        <Github className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                {p.canli_url && (
                                                    <a
                                                        href={p.canli_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-emerald-400 hover:text-emerald-300"
                                                        title="Canlı Demo"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                {!p.github_url && !p.canli_url && (
                                                    <span className="text-white/30">-</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-3.5 text-center">
                                            {/* Öne Çıkar Toggle */}
                                            <form action={toggleOneCikanAction} className="inline-block">
                                                <input type="hidden" name="id" value={p.id} />
                                                <input type="hidden" name="mevcut" value={p.one_cikan ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={p.one_cikan ? 'Öne çıkanlardan çıkar' : 'Öne çıkar'}
                                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                                        p.one_cikan
                                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                                            : 'bg-[var(--theme-surface)] text-white/30 border-white/10'
                                                    }`}
                                                >
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                </button>
                                            </form>
                                        </td>
                                        <td className="p-3.5 text-center">
                                            {/* Yayında Toggle */}
                                            <form action={toggleYayindaAction} className="inline-block">
                                                <input type="hidden" name="id" value={p.id} />
                                                <input type="hidden" name="mevcut" value={p.yayinda ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={p.yayinda ? 'Yayından kaldır' : 'Yayına al'}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                                                        p.yayinda
                                                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                                                            : 'bg-[var(--theme-surface)] text-white/50 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {p.yayinda ? (
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
                                                {/* Düzenle */}
                                                <Link
                                                    href={`/admin/projeler?edit=${p.id}`}
                                                    className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-emerald-500/20 hover:text-emerald-300 text-white/70 border border-[var(--theme-border)] transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* Sil */}
                                                <form action={projeSilAction} className="inline-block">
                                                    <input type="hidden" name="id" value={p.id} />
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
