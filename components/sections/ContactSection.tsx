'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PERSONAL_INFO } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Mail,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Laptop,
  Zap,
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactSection() {
  const { t } = usePortfolio();

  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const [copiedFull, setCopiedFull] = useState(false);
  const [copyFullError, setCopyFullError] = useState(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [activeDraftMethod, setActiveDraftMethod] = useState<'gmail' | 'outlook' | 'mailapp' | null>(null);

  const copyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const copyFullTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (copyFullTimerRef.current) clearTimeout(copyFullTimerRef.current);
    };
  }, []);

  const PRIMARY_EMAIL = PERSONAL_INFO.email;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PRIMARY_EMAIL);
      setCopied(true);
      setCopyError(false);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Clipboard writeText failed:', err);
      setCopied(false);
      setCopyError(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopyError(false), 3000);
    }
  };

  const getActiveSubject = () => formData.subject.trim() || t.contact.defaultSubject;

  const getFormattedMessageBody = () => {
    return [
      `${t.contact.mailBodySender}: ${formData.name.trim()}`,
      `${t.contact.mailBodyReplyTo}: ${formData.email.trim()}`,
      '',
      '---',
      '',
      formData.message.trim(),
      '',
      '---',
      '',
      `${t.contact.mailBodyPortfolio}: ${PERSONAL_INFO.canonicalUrl}`,
    ].join('\n');
  };

  const validate = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) {
      errors.name = t.contact.validationNameRequired;
    }
    if (!formData.email.trim()) {
      errors.email = t.contact.validationEmailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = t.contact.validationEmailInvalid;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = t.contact.validationMessageRequired;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 1. Form ile Gmail'e Aktar
  const handleSendGmail = () => {
    if (!validate()) return;
    const subject = getActiveSubject();
    const body = getFormattedMessageBody();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      PRIMARY_EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setActiveDraftMethod('gmail');
  };

  // 2. Form ile Outlook'a Aktar
  const handleSendOutlook = () => {
    if (!validate()) return;
    const subject = getActiveSubject();
    const body = getFormattedMessageBody();
    const url = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
      PRIMARY_EMAIL
    )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setActiveDraftMethod('outlook');
  };

  // 3. Form ile Cihazdaki Mail Uygulamasına Aktar
  const handleSendMailApp = () => {
    if (!validate()) return;
    const subject = getActiveSubject();
    const body = getFormattedMessageBody();
    const url = `mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setActiveDraftMethod('mailapp');
  };

  // Mesaj Detaylarını Panoya Kopyala
  const handleCopyFullMessage = async () => {
    try {
      const subject = getActiveSubject();
      const body = getFormattedMessageBody();
      const fullText = `${t.contact.copyPrefixTo}: ${PRIMARY_EMAIL}\n${t.contact.copyPrefixSubject}: ${subject}\n\n${body}`;
      await navigator.clipboard.writeText(fullText);
      setCopiedFull(true);
      setCopyFullError(false);
      if (copyFullTimerRef.current) clearTimeout(copyFullTimerRef.current);
      copyFullTimerRef.current = setTimeout(() => setCopiedFull(false), 2500);
    } catch (err) {
      console.warn('Clipboard writeText failed:', err);
      setCopiedFull(false);
      setCopyFullError(true);
      if (copyFullTimerRef.current) clearTimeout(copyFullTimerRef.current);
      copyFullTimerRef.current = setTimeout(() => setCopyFullError(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Header */}
      <SectionHeader
        tag={t.contact.sectionTag}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact & 1-Click Launchers (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card */}
          <div className="p-6 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-white/50 uppercase">
              <Mail className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>{t.contact.directEmailLabel}</span>
            </div>

            <div className="font-mono-code text-sm sm:text-base text-white font-bold break-all bg-[var(--theme-surface)] p-3 rounded border border-white/10">
              {PRIMARY_EMAIL}
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded font-mono-code text-xs font-semibold border border-[var(--theme-border)] text-white hover:border-[var(--theme-accent)] hover:text-[var(--theme-accent)] bg-[var(--theme-surface)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-400">{t.contact.emailCopied}</span>
                </>
              ) : copyError ? (
                <>
                  <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                  <span className="text-red-400">{t.contact.copyFailed}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
                  <span>{t.contact.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-4 font-mono-code text-xs">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-white/50 mb-2">
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:text-[var(--theme-accent)]" aria-hidden="true" />
              </div>
              <span className="font-semibold text-white">/Fylgja0</span>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between text-white/50 mb-2">
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:text-[var(--theme-accent)]" aria-hidden="true" />
              </div>
              <span className="font-semibold text-white">/ahmetcanbagli</span>
            </a>
          </div>

          {/* Functional 1-Click Mail Launchers (No Form Needed) */}
          <div className="p-5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] space-y-3.5 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[var(--theme-accent)] uppercase font-semibold">
              <Zap className="w-4 h-4 text-[var(--theme-accent)]" aria-hidden="true" />
              <span>{t.contact.oneClickMail}</span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-sans">
              {t.contact.fallbackHelp}
            </p>

            <div className="space-y-2 pt-1 font-mono-code text-xs">
              {/* Direct Gmail Web Link */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                  PRIMARY_EMAIL
                )}&su=${encodeURIComponent(t.contact.defaultSubject)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-200 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 fill-current text-red-400 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                  <span className="font-semibold">{t.contact.sendViaGmail}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-red-400/70 group-hover:text-red-300" aria-hidden="true" />
              </a>

              {/* Direct Outlook Web Link */}
              <a
                href={`https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
                  PRIMARY_EMAIL
                )}&subject=${encodeURIComponent(t.contact.defaultSubject)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 fill-current text-sky-400 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h17A2.5 2.5 0 0 1 23 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 18.5v-13zm2.2-.5a.5.5 0 0 0-.2.4v.3l9 5.6 9-5.6v-.3a.5.5 0 0 0-.5-.4h-17.3zm17.8 2.6-8.5 5.3a1 1 0 0 1-1 0L3 7.6v10.9a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5V7.6z" />
                  </svg>
                  <span className="font-semibold">{t.contact.sendViaOutlook}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400/70 group-hover:text-sky-300" aria-hidden="true" />
              </a>

              {/* Direct Device Mail App Link */}
              <a
                href={`mailto:${PRIMARY_EMAIL}?subject=${encodeURIComponent(t.contact.defaultSubject)}`}
                className="flex items-center justify-between px-3.5 py-2.5 rounded border border-[var(--theme-accent)]/40 bg-[var(--theme-accent)]/10 hover:bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span className="font-semibold">{t.contact.sendViaMailApp}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--theme-accent)]/70 group-hover:text-[var(--theme-accent)]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Message Form with Direct Providers (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] shadow-xl">
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold text-white font-mono-code">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-white/60 font-mono-code">
                {t.contact.formSubtitle}
              </p>
            </div>

            <div className="space-y-4 font-mono-code text-xs">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-white/80 font-medium block">
                    {t.contact.nameLabel} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded bg-[var(--theme-surface)] border text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-colors ${
                      formErrors.name
                        ? 'border-red-500/80 focus:ring-red-500'
                        : 'border-[var(--theme-border)]'
                    }`}
                  />
                  {formErrors.name && (
                    <div className="flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{formErrors.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-white/80 font-medium block">
                    {t.contact.emailLabel} *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded bg-[var(--theme-surface)] border text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-colors ${
                      formErrors.email
                        ? 'border-red-500/80 focus:ring-red-500'
                        : 'border-[var(--theme-border)]'
                    }`}
                  />
                  {formErrors.email && (
                    <div className="flex items-center gap-1 text-[11px] text-red-400">
                      <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>{formErrors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-white/80 font-medium block">
                  {t.contact.subjectLabel}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={150}
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder={t.contact.subjectPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-white/80 font-medium block">
                  {t.contact.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className={`w-full px-3.5 py-2.5 rounded bg-[var(--theme-surface)] border text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[var(--theme-accent)] transition-colors resize-y ${
                    formErrors.message
                      ? 'border-red-500/80 focus:ring-red-500'
                      : 'border-[var(--theme-border)]'
                  }`}
                />
                {formErrors.message && (
                  <div className="flex items-center gap-1 text-[11px] text-red-400">
                    <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{formErrors.message}</span>
                  </div>
                )}
              </div>

              {/* Success Notification Box when draft is triggered */}
              {activeDraftMethod && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-1.5 animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span>{t.contact.successTitle}</span>
                  </div>
                  <p className="text-[11px] text-emerald-400/90 leading-relaxed font-sans">
                    {t.contact.draftReadyNotice}
                  </p>
                </div>
              )}

              {/* Direct Mail Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-mono-code text-white/50 tracking-wider uppercase">
                  {t.contact.formSendOptions}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* 1. Gmail ile Gönder */}
                  <button
                    type="button"
                    onClick={handleSendGmail}
                    className="flex items-center justify-center gap-2 px-3.5 py-3 rounded font-semibold text-xs border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:border-red-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-sm group"
                  >
                    <svg
                      className="w-4 h-4 shrink-0 fill-current text-red-400 group-hover:scale-105 transition-transform"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.545l8.073-6.052C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                    <span>{t.contact.sendViaGmail}</span>
                    <ExternalLink className="w-3 h-3 text-red-400/70" aria-hidden="true" />
                  </button>

                  {/* 2. Outlook ile Gönder */}
                  <button
                    type="button"
                    onClick={handleSendOutlook}
                    className="flex items-center justify-center gap-2 px-3.5 py-3 rounded font-semibold text-xs border border-sky-500/40 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 hover:border-sky-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 shadow-sm group"
                  >
                    <svg
                      className="w-4 h-4 shrink-0 fill-current text-sky-400 group-hover:scale-105 transition-transform"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M1 5.5A2.5 2.5 0 0 1 3.5 3h17A2.5 2.5 0 0 1 23 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 18.5v-13zm2.2-.5a.5.5 0 0 0-.2.4v.3l9 5.6 9-5.6v-.3a.5.5 0 0 0-.5-.4h-17.3zm17.8 2.6-8.5 5.3a1 1 0 0 1-1 0L3 7.6v10.9a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5V7.6z" />
                    </svg>
                    <span>{t.contact.sendViaOutlook}</span>
                    <ExternalLink className="w-3 h-3 text-sky-400/70" aria-hidden="true" />
                  </button>

                  {/* 3. Cihazdaki Mail Uygulaması ile Gönder */}
                  <button
                    type="button"
                    onClick={handleSendMailApp}
                    className="flex items-center justify-center gap-2 px-3.5 py-3 rounded font-semibold text-xs border border-[var(--theme-accent)]/50 bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/25 hover:border-[var(--theme-accent)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] shadow-sm group"
                  >
                    <Laptop className="w-4 h-4 shrink-0 group-hover:scale-105 transition-transform" aria-hidden="true" />
                    <span>{t.contact.sendViaMailApp}</span>
                  </button>
                </div>

                {/* Secondary Option: Copy formatted message details */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleCopyFullMessage}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-[var(--theme-border)] text-white/70 hover:text-white hover:border-[var(--theme-accent)] bg-[var(--theme-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] text-[11px]"
                  >
                    {copiedFull ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-emerald-400">{t.contact.copied}</span>
                      </>
                    ) : copyFullError ? (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                        <span className="text-red-400">{t.contact.copyFailed}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
                        <span>{t.contact.copyFullMessage}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
