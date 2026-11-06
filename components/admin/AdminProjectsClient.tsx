'use client';

import React from 'react';
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
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';

export interface ProjeRow {
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

interface AdminProjectsClientProps {
    projeler: ProjeRow[];
    editKayit: ProjeRow | null;
    onAdd: (formData: FormData) => Promise<void>;
    onUpdate: (formData: FormData) => Promise<void>;
    onTogglePublish: (formData: FormData) => Promise<void>;
    onToggleFeatured: (formData: FormData) => Promise<void>;
    onDelete: (formData: FormData) => Promise<void>;
}

export function AdminProjectsClient({
    projeler,
    editKayit,
    onAdd,
    onUpdate,
    onTogglePublish,
    onToggleFeatured,
    onDelete,
}: AdminProjectsClientProps) {
    const { language } = usePortfolio();
    const t = adminTranslations[language] || adminTranslations.en;

    const getCategoryName = (cat: string) => {
        switch (cat) {
            case 'backend':
                return t.projects.form.catBackend;
            case 'datascience':
                return t.projects.form.catDataScience;
            case 'fullstack':
                return t.projects.form.catFullStack;
            case 'mobile':
                return t.projects.form.catMobile;
            default:
                return cat;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2.5">
                        <FolderGit2 className="w-6 h-6 text-emerald-400" />
                        <span>{t.projects.title}</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        {t.projects.subtitle}
                    </p>
                </div>

                <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
                    {t.projects.totalCount(projeler.length)}
                </div>
            </div>

            {/* Create or Edit Project Form */}
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
                                <span>{t.projects.form.editTitle(editKayit.id)}</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                                <span>{t.projects.form.addTitle}</span>
                            </>
                        )}
                    </h2>

                    {editKayit && (
                        <Link
                            href="/admin/projects"
                            className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>{t.projects.form.cancelEdit}</span>
                        </Link>
                    )}
                </div>

                <form action={editKayit ? onUpdate : onAdd} className="space-y-4 font-mono text-xs">
                    {editKayit && <input type="hidden" name="id" value={editKayit.id} />}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Title */}
                        <div className="lg:col-span-2">
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.projects.form.titleLabel}
                            </label>
                            <input
                                type="text"
                                name="baslik"
                                required
                                defaultValue={editKayit?.baslik || ''}
                                placeholder={t.projects.form.titlePlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.projects.form.categoryLabel}
                            </label>
                            <select
                                name="kategori"
                                defaultValue={editKayit?.kategori || 'backend'}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] cursor-pointer"
                            >
                                <option value="backend" className="bg-slate-900 text-white">{t.projects.form.catBackend}</option>
                                <option value="datascience" className="bg-slate-900 text-white">{t.projects.form.catDataScience}</option>
                                <option value="fullstack" className="bg-slate-900 text-white">{t.projects.form.catFullStack}</option>
                                <option value="mobile" className="bg-slate-900 text-white">{t.projects.form.catMobile}</option>
                            </select>
                        </div>

                        {/* GitHub URL */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.projects.form.githubLabel}
                            </label>
                            <input
                                type="url"
                                name="github_url"
                                defaultValue={editKayit?.github_url || ''}
                                placeholder={t.projects.form.githubPlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Live Demo URL */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.projects.form.demoLabel}
                            </label>
                            <input
                                type="url"
                                name="canli_url"
                                defaultValue={editKayit?.canli_url || ''}
                                placeholder={t.projects.form.demoPlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.projects.form.techLabel}
                            </label>
                            <input
                                type="text"
                                name="teknolojiler"
                                defaultValue={editKayit?.teknolojiler || ''}
                                placeholder={t.projects.form.techPlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>
                    </div>

                    {/* Short Summary */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            {t.projects.form.summaryLabel}
                        </label>
                        <input
                            type="text"
                            name="aciklama"
                            required
                            defaultValue={editKayit?.aciklama || ''}
                            placeholder={t.projects.form.summaryPlaceholder}
                            className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                        />
                    </div>

                    {/* Detailed Overview */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            {t.projects.form.detailLabel}
                        </label>
                        <textarea
                            name="detay"
                            rows={3}
                            defaultValue={editKayit?.detay || ''}
                            placeholder={t.projects.form.detailPlaceholder}
                            className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] resize-y"
                        />
                    </div>

                    {/* Order & Featured */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-center">
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5 text-xs font-mono">
                                {t.projects.form.orderLabel}
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
                                    {t.projects.form.featuredLabel}
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
                            {editKayit ? t.projects.form.saveButton : t.projects.form.createButton}
                        </button>

                        {editKayit && (
                            <Link
                                href="/admin/projects"
                                className="px-4 py-2.5 rounded-lg text-xs font-mono font-medium bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 transition-colors"
                            >
                                {t.projects.form.cancel}
                            </Link>
                        )}
                    </div>
                </form>
            </div>

            {/* Projects List Table */}
            <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-400" />
                        <span>{t.projects.table.title}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        {t.projects.table.note}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">{t.projects.table.colId}</th>
                                <th className="p-3.5">{t.projects.table.colTitle}</th>
                                <th className="p-3.5">{t.projects.table.colCategory}</th>
                                <th className="p-3.5">{t.projects.table.colTech}</th>
                                <th className="p-3.5">{t.projects.table.colLinks}</th>
                                <th className="p-3.5 text-center">{t.projects.table.colFeatured}</th>
                                <th className="p-3.5 text-center">{t.projects.table.colStatus}</th>
                                <th className="p-3.5 text-right">{t.projects.table.colActions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {projeler.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-white/40">
                                        {t.projects.table.empty}
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
                                                {getCategoryName(p.kategori)}
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
                                                        title="Live Demo"
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
                                            {/* Featured Toggle */}
                                            <form action={onToggleFeatured} className="inline-block">
                                                <input type="hidden" name="id" value={p.id} />
                                                <input type="hidden" name="mevcut" value={p.one_cikan ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={p.one_cikan ? t.projects.table.featureRemove : t.projects.table.featureAdd}
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
                                            {/* Published Toggle */}
                                            <form action={onTogglePublish} className="inline-block">
                                                <input type="hidden" name="id" value={p.id} />
                                                <input type="hidden" name="mevcut" value={p.yayinda ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={p.yayinda ? t.projects.table.toggleDraft : t.projects.table.togglePublish}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                                                        p.yayinda
                                                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                                                            : 'bg-[var(--theme-surface)] text-white/50 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {p.yayinda ? (
                                                        <>
                                                            <Eye className="w-3 h-3" />
                                                            <span>{t.projects.table.statusPublished}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="w-3 h-3" />
                                                            <span>{t.projects.table.statusDraft}</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </td>
                                        <td className="p-3.5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Edit */}
                                                <Link
                                                    href={`/admin/projects?edit=${p.id}`}
                                                    className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-emerald-500/20 hover:text-emerald-300 text-white/70 border border-[var(--theme-border)] transition-colors"
                                                    title={t.projects.table.editTooltip}
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* Delete */}
                                                <form action={onDelete} className="inline-block">
                                                    <input type="hidden" name="id" value={p.id} />
                                                    <button
                                                        type="submit"
                                                        title={t.projects.table.deleteTooltip}
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

