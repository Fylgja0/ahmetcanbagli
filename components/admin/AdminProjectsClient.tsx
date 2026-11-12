'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Layers,
  AlertTriangle,
  CheckCircle2,
  ArrowRightLeft,
} from 'lucide-react';
import { usePortfolio } from '@/context/portfolio-context';
import { adminTranslations } from '@/lib/admin-translations';
import {
  FeaturedProjectOption,
  MAX_FEATURED_PROJECTS,
  ProjectMutationResult,
  ProjectRecord,
} from '@/types/admin';

interface AdminProjectsClientProps {
  projects: ProjectRecord[];
  editingProject: ProjectRecord | null;
  onAdd: (formData: FormData) => Promise<ProjectMutationResult>;
  onUpdate: (formData: FormData) => Promise<ProjectMutationResult>;
  onTogglePublish: (formData: FormData) => Promise<void>;
  onToggleFeatured: (formData: FormData) => Promise<ProjectMutationResult>;
  onDelete: (formData: FormData) => Promise<void>;
}

interface PendingFeaturedOperation {
  type: 'create' | 'update' | 'toggle';
  formData: FormData;
  candidateTitle: string;
  excludeId?: number;
}

interface StatusBanner {
  type: 'success' | 'error';
  message: string;
}

export function AdminProjectsClient({
  projects,
  editingProject,
  onAdd,
  onUpdate,
  onTogglePublish,
  onToggleFeatured,
  onDelete,
}: AdminProjectsClientProps) {
  const { language } = usePortfolio();
  const t = adminTranslations[language] || adminTranslations.en;
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(null);
  const [pendingOperation, setPendingOperation] =
    useState<PendingFeaturedOperation | null>(null);
  const [featuredModalOptions, setFeaturedModalOptions] = useState<
    FeaturedProjectOption[]
  >([]);
  const [selectedReplaceId, setSelectedReplaceId] = useState<number | null>(
    null
  );
  const [modalError, setModalError] = useState<string | null>(null);

  // Featured projects sorted in the exact same order as the homepage (`ORDER BY sira ASC, id ASC`)
  const currentFeaturedProjects = useMemo<FeaturedProjectOption[]>(() => {
    return [...projects]
      .filter((p) => p.isFeatured)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
      .map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        summary: p.summary,
        technologies: p.technologies,
        sortOrder: p.sortOrder,
        isPublished: p.isPublished,
      }));
  }, [projects]);

  useEffect(() => {
    if (!statusBanner) return;
    const timer = window.setTimeout(() => {
      setStatusBanner(null);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [statusBanner]);

  useEffect(() => {
    if (!pendingOperation) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        setPendingOperation(null);
        setSelectedReplaceId(null);
        setModalError(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pendingOperation, isSubmitting]);

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

  const openReplacementModal = (
    operation: PendingFeaturedOperation,
    options: FeaturedProjectOption[],
    customError?: string | null
  ) => {
    setFeaturedModalOptions(options);
    setPendingOperation(operation);
    setSelectedReplaceId(null);
    setModalError(customError ?? null);
  };

  const closeReplacementModal = () => {
    if (isSubmitting) return;
    setPendingOperation(null);
    setSelectedReplaceId(null);
    setModalError(null);
  };

  const executeProjectMutation = async (
    operation: PendingFeaturedOperation,
    replaceFeaturedId?: number
  ) => {
    const payload = new FormData();
    operation.formData.forEach((value, key) => {
      if (key !== 'replaceFeaturedId') {
        payload.append(key, value);
      }
    });

    if (replaceFeaturedId) {
      payload.set('replaceFeaturedId', String(replaceFeaturedId));
    }

    setIsSubmitting(true);
    setModalError(null);

    try {
      let result: ProjectMutationResult;
      if (operation.type === 'create') {
        result = await onAdd(payload);
      } else if (operation.type === 'update') {
        result = await onUpdate(payload);
      } else {
        result = await onToggleFeatured(payload);
      }

      if (result.status === 'limit_reached') {
        const options =
          result.featuredProjects && result.featuredProjects.length > 0
            ? result.featuredProjects
            : currentFeaturedProjects.filter(
                (item) => item.id !== operation.excludeId
              );
        openReplacementModal(
          operation,
          options,
          replaceFeaturedId ? (result.message ?? null) : null
        );
        return;
      }

      if (result.status === 'error') {
        if (pendingOperation) {
          setModalError(
            result.message || 'İşlem sırasında bir hata meydana geldi.'
          );
        } else {
          setStatusBanner({
            type: 'error',
            message:
              result.message || 'İşlem sırasında bir hata meydana geldi.',
          });
        }
        return;
      }

      // Success
      setPendingOperation(null);
      setSelectedReplaceId(null);
      setModalError(null);
      setStatusBanner({
        type: 'success',
        message: result.message || 'İşlem başarıyla tamamlandı.',
      });

      if (operation.type === 'create') {
        formRef.current?.reset();
        router.refresh();
      } else if (operation.type === 'update') {
        router.push('/admin/projects');
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      const fallbackMsg =
        'İşlem sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
      if (pendingOperation) {
        setModalError(fallbackMsg);
      } else {
        setStatusBanner({
          type: 'error',
          message: fallbackMsg,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const title = formData.get('title')?.toString().trim() || 'Yeni Proje';
    const wantsFeatured =
      formData.get('isFeatured') === 'on' ||
      formData.get('isFeatured') === 'true';

    const operation: PendingFeaturedOperation = {
      type: editingProject ? 'update' : 'create',
      formData,
      candidateTitle: title,
      excludeId: editingProject?.id,
    };

    // Editing an already-Featured project or saving a non-Featured project never triggers the replacement modal
    const isAlreadyFeaturedEdit = Boolean(editingProject?.isFeatured);

    if (wantsFeatured && !isAlreadyFeaturedEdit) {
      const otherFeatured = currentFeaturedProjects.filter(
        (p) => p.id !== editingProject?.id
      );

      if (otherFeatured.length >= MAX_FEATURED_PROJECTS) {
        openReplacementModal(
          operation,
          otherFeatured.slice(0, MAX_FEATURED_PROJECTS)
        );
        return;
      }
    }

    await executeProjectMutation(operation);
  };

  const handleToggleFeaturedSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    project: ProjectRecord
  ) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const operation: PendingFeaturedOperation = {
      type: 'toggle',
      formData,
      candidateTitle: project.title,
      excludeId: project.id,
    };

    // Unfeaturing a currently Featured project is always allowed directly
    if (!project.isFeatured) {
      const otherFeatured = currentFeaturedProjects.filter(
        (p) => p.id !== project.id
      );

      if (otherFeatured.length >= MAX_FEATURED_PROJECTS) {
        openReplacementModal(
          operation,
          otherFeatured.slice(0, MAX_FEATURED_PROJECTS)
        );
        return;
      }
    }

    await executeProjectMutation(operation);
  };

  const handleConfirmReplacement = async () => {
    if (!pendingOperation || !selectedReplaceId || isSubmitting) return;
    await executeProjectMutation(pendingOperation, selectedReplaceId);
  };

  const selectedReplaceProject = useMemo(
    () =>
      featuredModalOptions.find((item) => item.id === selectedReplaceId) ??
      null,
    [featuredModalOptions, selectedReplaceId]
  );

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

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>
              Öne Çıkan: {currentFeaturedProjects.length} /{' '}
              {MAX_FEATURED_PROJECTS}
            </span>
          </div>

          <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white/70">
            {t.projects.totalCount(projects.length)}
          </div>
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusBanner && (
        <div
          role="status"
          aria-live="polite"
          className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border font-mono text-xs transition-all shadow-lg ${
            statusBanner.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/60 border-red-500/40 text-red-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {statusBanner.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{statusBanner.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Bildirimi kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Create or Edit Project Form */}
      <div
        className={`p-6 rounded-2xl border transition-all shadow-xl ${
          editingProject
            ? 'bg-emerald-950/20 border-emerald-500/50'
            : 'bg-[var(--theme-card)]/90 border-[var(--theme-border)]'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold font-mono text-white flex items-center gap-2">
            {editingProject ? (
              <>
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <span>{t.projects.form.editTitle(editingProject.id)}</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 text-[var(--theme-accent)]" />
                <span>{t.projects.form.addTitle}</span>
              </>
            )}
          </h2>

          {editingProject && (
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-1 text-xs font-mono text-white/70 hover:text-white px-3 py-1.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.projects.form.cancelEdit}</span>
            </Link>
          )}
        </div>

        <form
          key={editingProject ? `edit-${editingProject.id}` : 'create'}
          ref={formRef}
          onSubmit={handleFormSubmit}
          className="space-y-4 font-mono text-xs"
        >
          {editingProject && (
            <input type="hidden" name="id" value={editingProject.id} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Title */}
            <div className="lg:col-span-2">
              <label className="block text-white/80 font-medium mb-1.5">
                {t.projects.form.titleLabel}
              </label>
              <input
                type="text"
                name="title"
                required
                defaultValue={editingProject?.title || ''}
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
                name="category"
                defaultValue={editingProject?.category || 'backend'}
                className="w-full px-3.5 py-2.5 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white focus:outline-none focus:border-[var(--theme-accent)] focus:ring-1 focus:ring-[var(--theme-accent)] cursor-pointer"
              >
                <option value="backend" className="bg-slate-900 text-white">
                  {t.projects.form.catBackend}
                </option>
                <option value="datascience" className="bg-slate-900 text-white">
                  {t.projects.form.catDataScience}
                </option>
                <option value="fullstack" className="bg-slate-900 text-white">
                  {t.projects.form.catFullStack}
                </option>
                <option value="mobile" className="bg-slate-900 text-white">
                  {t.projects.form.catMobile}
                </option>
              </select>
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-white/80 font-medium mb-1.5">
                {t.projects.form.githubLabel}
              </label>
              <input
                type="url"
                name="githubUrl"
                defaultValue={editingProject?.githubUrl || ''}
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
                name="liveUrl"
                defaultValue={editingProject?.liveUrl || ''}
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
                name="technologies"
                defaultValue={editingProject?.technologies || ''}
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
              name="summary"
              required
              defaultValue={editingProject?.summary || ''}
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
              name="details"
              rows={3}
              defaultValue={editingProject?.details || ''}
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
                name="sortOrder"
                defaultValue={editingProject?.sortOrder ?? 0}
                min={0}
                max={999}
                className="w-32 px-3 py-2 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg text-white font-mono text-sm focus:outline-none focus:border-[var(--theme-accent)]"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer select-none mt-4 sm:mt-0">
                <input
                  type="checkbox"
                  name="isFeatured"
                  defaultChecked={
                    editingProject ? editingProject.isFeatured : true
                  }
                  className="h-4 w-4 rounded border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-accent)] focus:ring-[var(--theme-accent)] cursor-pointer"
                />
                <span className="text-white/80 text-xs">
                  {t.projects.form.featuredLabel}
                </span>
              </label>
              <p className="text-[11px] text-white/45 mt-1">
                Ana sayfada en fazla {MAX_FEATURED_PROJECTS} proje öne
                çıkarılabilir.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer shadow-lg disabled:opacity-50 ${
                editingProject
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[var(--theme-accent)] hover:opacity-90 text-black'
              }`}
            >
              {editingProject
                ? t.projects.form.saveButton
                : t.projects.form.createButton}
            </button>

            {editingProject && (
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
                <th className="p-3.5 text-center">
                  {t.projects.table.colFeatured}
                </th>
                <th className="p-3.5 text-center">
                  {t.projects.table.colStatus}
                </th>
                <th className="p-3.5 text-right">
                  {t.projects.table.colActions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-white/40">
                    {t.projects.table.empty}
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className={`hover:bg-white/5 transition-colors ${
                      editingProject?.id === project.id
                        ? 'bg-emerald-500/10'
                        : ''
                    }`}
                  >
                    <td className="p-3.5 font-bold text-white/40">
                      #{project.id}
                    </td>
                    <td className="p-3.5 font-medium text-white max-w-xs break-words">
                      {project.title}
                      <span className="block text-[11px] text-white/50 font-sans mt-0.5 line-clamp-1">
                        {project.summary}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--theme-surface)] text-white/80 border border-white/10 text-[11px]">
                        {getCategoryName(project.category)}
                      </span>
                    </td>
                    <td className="p-3.5 text-white/70 max-w-[200px] truncate">
                      {project.technologies || (
                        <span className="text-white/30">-</span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/70 hover:text-white"
                            title="GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {!project.githubUrl && !project.liveUrl && (
                          <span className="text-white/30">-</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-center">
                      {/* Featured Toggle */}
                      <form
                        onSubmit={(e) => handleToggleFeaturedSubmit(e, project)}
                        className="inline-block"
                      >
                        <input type="hidden" name="id" value={project.id} />
                        <input
                          type="hidden"
                          name="currentState"
                          value={project.isFeatured ? 'true' : 'false'}
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          title={
                            project.isFeatured
                              ? t.projects.table.featureRemove
                              : t.projects.table.featureAdd
                          }
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer disabled:opacity-50 ${
                            project.isFeatured
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
                        <input type="hidden" name="id" value={project.id} />
                        <input
                          type="hidden"
                          name="currentState"
                          value={project.isPublished ? 'true' : 'false'}
                        />
                        <button
                          type="submit"
                          title={
                            project.isPublished
                              ? t.projects.table.toggleDraft
                              : t.projects.table.togglePublish
                          }
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer border ${
                            project.isPublished
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/25'
                              : 'bg-[var(--theme-surface)] text-white/50 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {project.isPublished ? (
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
                          href={`/admin/projects?edit=${project.id}`}
                          className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:bg-emerald-500/20 hover:text-emerald-300 text-white/70 border border-[var(--theme-border)] transition-colors"
                          title={t.projects.table.editTooltip}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        {/* Delete */}
                        <form action={onDelete} className="inline-block">
                          <input type="hidden" name="id" value={project.id} />
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

      {/* Featured Project Replacement Modal */}
      {pendingOperation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="featured-replace-modal-title"
          onClick={closeReplacementModal}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] shadow-2xl overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[var(--theme-surface)]/50">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>
                    Öne Çıkan Proje Sınırı (Maksimum {MAX_FEATURED_PROJECTS})
                  </span>
                </div>
                <h3
                  id="featured-replace-modal-title"
                  className="text-base sm:text-lg font-bold text-white flex items-center gap-2"
                >
                  <ArrowRightLeft className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Vitrin Projesi Değiştir</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={closeReplacementModal}
                disabled={isSubmitting}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <p className="text-xs text-white/75 leading-relaxed font-sans">
                Ana sayfada aynı anda en fazla{' '}
                <strong className="text-white">
                  {MAX_FEATURED_PROJECTS} proje
                </strong>{' '}
                öne çıkarılabilir.{' '}
                <strong className="text-emerald-300">
                  &ldquo;{pendingOperation.candidateTitle}&rdquo;
                </strong>{' '}
                projesini vitrine eklemek için aşağıda ana sayfa sırasıyla
                listelenen mevcut vitrin projelerinden hangisinin yerini
                alacağını seçin:
              </p>

              {modalError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="space-y-2.5">
                {featuredModalOptions.map((option, index) => {
                  const isSelected = selectedReplaceId === option.id;
                  return (
                    <label
                      key={option.id}
                      onClick={() => setSelectedReplaceId(option.id)}
                      className={`block p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-400 shadow-md'
                          : 'bg-[var(--theme-surface)]/80 border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="replaceFeaturedSelection"
                           value={option.id}
                          checked={isSelected}
                          onChange={() => setSelectedReplaceId(option.id)}
                          className="mt-1 h-4 w-4 text-emerald-500 border-white/30 bg-slate-900 focus:ring-emerald-400 cursor-pointer"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold shrink-0">
                                {index + 1}. Vitrin Slotu
                              </span>
                              <span className="text-xs font-bold text-white truncate">
                                {option.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70">
                                {getCategoryName(option.category)}
                              </span>
                              <span className="text-[10px] text-white/40">
                                Sıra: {option.sortOrder}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-white/60 font-sans mt-1.5 line-clamp-2">
                            {option.summary}
                          </p>

                          {option.technologies && (
                            <p className="text-[11px] text-emerald-300/80 mt-1.5 truncate">
                              {option.technologies}
                            </p>
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>

              {selectedReplaceProject && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-100 font-sans leading-relaxed">
                  <strong className="text-emerald-300 font-mono">
                    Değişim Özeti:
                  </strong>{' '}
                  <strong>&ldquo;{selectedReplaceProject.title}&rdquo;</strong>{' '}
                  projesinin öne çıkarılma durumu kaldırılacak (proje silinmez)
                  ve yerine{' '}
                  <strong>
                    &ldquo;{pendingOperation.candidateTitle}&rdquo;
                  </strong>{' '}
                  projesi vitrine eklenecektir.
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[var(--theme-surface)]/40 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeReplacementModal}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg text-xs font-mono font-medium bg-[var(--theme-surface)] hover:bg-white/10 text-white/80 border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
              >
                İptal
              </button>

              <button
                type="button"
                onClick={handleConfirmReplacement}
                disabled={!selectedReplaceId || isSubmitting}
                className="px-5 py-2 rounded-lg text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition-all cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? 'Değiştiriliyor...'
                    : 'Seçilen Projeyle Değiştir'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminProjectsClient;
