'use client';

import React from 'react';
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
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';

export interface OdulRow {
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

export interface KategoriRow {
    id: number;
    ad: string;
}

interface AdminAwardsClientProps {
    oduller: OdulRow[];
    kategoriler: KategoriRow[];
    editKayit: OdulRow | null;
    awardsVisible: boolean;
    onToggleVisibility: () => Promise<void>;
    onAdd: (formData: FormData) => Promise<void>;
    onUpdate: (formData: FormData) => Promise<void>;
    onTogglePublish: (formData: FormData) => Promise<void>;
    onDelete: (formData: FormData) => Promise<void>;
}

export function AdminAwardsClient({
    oduller,
    kategoriler,
    editKayit,
    awardsVisible,
    onToggleVisibility,
    onAdd,
    onUpdate,
    onTogglePublish,
    onDelete,
}: AdminAwardsClientProps) {
    const { language } = usePortfolio();
    const t = adminTranslations[language] || adminTranslations.en;

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
                        <span>{t.awards.title}</span>
                    </h1>
                    <p className="text-xs font-mono text-white/60 mt-1">
                        {t.awards.subtitle}
                    </p>
                </div>

                <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
                    {t.awards.totalCount(oduller.length)}
                </div>
            </div>

            {/* Awards Global Visibility Control Panel */}
            <div className={`p-5 rounded-2xl border transition-all shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                awardsVisible
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-amber-950/25 border-amber-500/40'
            }`}>
                <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                            awardsVisible
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                            <span className={`w-2 h-2 rounded-full ${awardsVisible ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            <span>{awardsVisible ? t.awards.visibility.liveStatus : t.awards.visibility.hiddenStatus}</span>
                        </span>
                        <span className="text-xs font-mono text-white/40">· {t.awards.visibility.scopeLabel}</span>
                    </div>
                    <p className="text-xs text-white/70 font-mono leading-relaxed">
                        {awardsVisible ? t.awards.visibility.liveDesc : t.awards.visibility.hiddenDesc}
                    </p>
                </div>

                <form action={onToggleVisibility} className="shrink-0">
                    <button
                        type="submit"
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono font-bold text-xs cursor-pointer transition-all shadow-md ${
                            awardsVisible
                                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-500/50'
                                : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 hover:border-emerald-500/60'
                        }`}
                    >
                        {awardsVisible ? (
                            <>
                                <EyeOff className="w-4 h-4 text-amber-400" />
                                <span>{t.awards.visibility.hideButton}</span>
                            </>
                        ) : (
                            <>
                                <Eye className="w-4 h-4 text-emerald-400" />
                                <span>{t.awards.visibility.publishButton}</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Create or Edit Form (INSERT & UPDATE) */}
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
                                <span>{t.awards.form.editTitle(editKayit.id)}</span>
                            </>
                        ) : (
                            <>
                                <PlusCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                                <span>{t.awards.form.addTitle}</span>
                            </>
                        )}
                    </h2>

                    {editKayit && (
                        <Link
                            href="/admin/awards"
                            className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span>{t.awards.form.cancelEdit}</span>
                        </Link>
                    )}
                </div>

                <form action={editKayit ? onUpdate : onAdd} className="space-y-4 font-mono text-xs">
                    {editKayit && <input type="hidden" name="id" value={editKayit.id} />}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Title */}
                        <div className="lg:col-span-2">
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.awards.form.nameLabel}
                            </label>
                            <input
                                type="text"
                                name="ad"
                                required
                                defaultValue={editKayit?.ad || ''}
                                placeholder={t.awards.form.namePlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Category (odul_turleri JOIN) */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.awards.form.categoryLabel}
                            </label>
                            <select
                                name="kategori_id"
                                defaultValue={editKayit?.kategori_id || ''}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] cursor-pointer"
                            >
                                <option value="">{t.awards.form.categoryEmpty}</option>
                                {kategoriler.map((k) => (
                                    <option key={k.id} value={k.id} className="bg-slate-900 text-white">
                                        {k.ad}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Awarding Organization */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.awards.form.orgLabel}
                            </label>
                            <input
                                type="text"
                                name="veren_kurum"
                                defaultValue={editKayit?.veren_kurum || ''}
                                placeholder={t.awards.form.orgPlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.awards.form.dateLabel}
                            </label>
                            <input
                                type="date"
                                name="tarih"
                                defaultValue={formatDateForInput(editKayit?.tarih || null)}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] cursor-pointer"
                            />
                        </div>

                        {/* Rank */}
                        <div>
                            <label className="block text-white/80 font-medium mb-1.5">
                                {t.awards.form.rankLabel}
                            </label>
                            <input
                                type="number"
                                name="derece"
                                min="1"
                                defaultValue={editKayit?.derece ?? ''}
                                placeholder={t.awards.form.rankPlaceholder}
                                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-[var(--theme-accent)]"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white/80 font-medium mb-1.5">
                            {t.awards.form.descLabel}
                        </label>
                        <textarea
                            name="aciklama"
                            rows={3}
                            defaultValue={editKayit?.aciklama || ''}
                            placeholder={t.awards.form.descPlaceholder}
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
                            {editKayit ? t.awards.form.saveButton : t.awards.form.createButton}
                        </button>

                        {editKayit && (
                            <Link
                                href="/admin/awards"
                                className="px-4 py-2.5 rounded-lg text-xs font-mono font-medium bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 transition-colors"
                            >
                                {t.awards.form.cancel}
                            </Link>
                        )}
                    </div>
                </form>
            </div>

            {/* Records List Table */}
            <div className="bg-[var(--theme-card)]/90 border border-[var(--theme-border)] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-sm font-bold font-mono text-white">
                        {t.awards.table.title}
                    </h3>
                    <span className="text-[11px] font-mono text-white/50">
                        {t.awards.table.note}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs text-white/80 border-collapse">
                        <thead>
                            <tr className="bg-[var(--theme-surface)]/70 border-b border-white/10 text-white/50 uppercase text-[10px] tracking-wider">
                                <th className="p-3.5">{t.awards.table.colId}</th>
                                <th className="p-3.5">{t.awards.table.colTitle}</th>
                                <th className="p-3.5">{t.awards.table.colCategory}</th>
                                <th className="p-3.5">{t.awards.table.colInstitution}</th>
                                <th className="p-3.5">{t.awards.table.colDate}</th>
                                <th className="p-3.5">{t.awards.table.colRank}</th>
                                <th className="p-3.5 text-center">{t.awards.table.colStatus}</th>
                                <th className="p-3.5 text-right">{t.awards.table.colActions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {oduller.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-white/40">
                                        {t.awards.table.empty}
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
                                            {o.tarih ? new Date(o.tarih).toLocaleDateString(language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : language === 'ru' ? 'ru-RU' : 'en-US') : '-'}
                                        </td>
                                        <td className="p-3.5">
                                            {o.derece ? (
                                                <span className="font-bold text-amber-400">
                                                    {o.derece === 1 ? t.awards.table.firstPlace : `${o.derece}${t.awards.table.rankSuffix}`}
                                                </span>
                                            ) : (
                                                <span className="text-white/30">-</span>
                                            )}
                                        </td>
                                        <td className="p-3.5 text-center">
                                            {/* Published / Draft Toggle Button */}
                                            <form action={onTogglePublish} className="inline-block">
                                                <input type="hidden" name="id" value={o.id} />
                                                <input type="hidden" name="mevcut" value={o.yayinda ? 'true' : 'false'} />
                                                <button
                                                    type="submit"
                                                    title={o.yayinda ? t.awards.table.toggleDraft : t.awards.table.togglePublish}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                                                        o.yayinda
                                                            ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                                                            : 'bg-[var(--theme-surface)] text-white/50 border-white/10 hover:bg-white/10'
                                                    }`}
                                                >
                                                    {o.yayinda ? (
                                                        <>
                                                            <Eye className="w-3 h-3" />
                                                            <span>{t.awards.table.statusPublished}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="w-3 h-3" />
                                                            <span>{t.awards.table.statusDraft}</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        </td>
                                        <td className="p-3.5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Edit Link */}
                                                <Link
                                                    href={`/admin/awards?edit=${o.id}`}
                                                    className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-amber-500/20 hover:text-amber-300 text-white/70 border border-[var(--theme-border)] transition-colors"
                                                    title={t.awards.table.editTooltip}
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Link>

                                                {/* Delete Button */}
                                                <form action={onDelete} className="inline-block">
                                                    <input type="hidden" name="id" value={o.id} />
                                                    <button
                                                        type="submit"
                                                        title={t.awards.table.deleteTooltip}
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

