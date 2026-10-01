'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { NAV_ITEMS, THEME_CONFIGS, PERSONAL_INFO } from '@/lib/data';
import { LanguageId, ThemeId } from '@/types/portfolio';
import { useClickOutside, useKeydown } from '@/hooks/use-click-outside';
import {
  Terminal,
  Menu,
  X,
  Play,
  Pause,
  Palette,
  Globe,
  ExternalLink,
} from 'lucide-react';

const LANGUAGES: { id: LanguageId; label: string; code: string }[] = [
  { id: 'tr', label: 'Türkçe', code: 'TR' },
  { id: 'en', label: 'English', code: 'EN' },
  { id: 'de', label: 'Deutsch', code: 'DE' },
  { id: 'ru', label: 'Русский', code: 'RU' },
];

const SECTIONS = ['hero', 'about', 'skills', 'projects', 'education', 'focus', 'contact'] as const;

export function Navbar() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    animationsEnabled,
    toggleAnimations,
    activeSection,
    setActiveSection,
    t,
  } = usePortfolio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close dropdowns on outside clicks
  const closeThemeDropdown = useCallback(() => setThemeDropdownOpen(false), []);
  const closeLangDropdown = useCallback(() => setLangDropdownOpen(false), []);
  const themeDropdownRef = useClickOutside<HTMLDivElement>(closeThemeDropdown, themeDropdownOpen);
  const langDropdownRef = useClickOutside<HTMLDivElement>(closeLangDropdown, langDropdownOpen);

  // Close on Escape key press
  useKeydown('Escape', () => {
    setThemeDropdownOpen(false);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  });

  // Scroll detection for navbar background & active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 180;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const handleThemeSelect = (id: ThemeId) => {
    setTheme(id);
    setThemeDropdownOpen(false);
  };

  const handleLangSelect = (id: LanguageId) => {
    setLanguage(id);
    setLangDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[var(--theme-surface)]/90 backdrop-blur-md border-[var(--theme-border)] shadow-lg'
          : 'bg-[var(--theme-bg)]/60 backdrop-blur-sm border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-2.5 text-white font-mono-code font-bold tracking-tight text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] rounded px-1.5 py-1"
        >
          <div className="w-8 h-8 rounded border border-[var(--theme-border)] bg-[var(--theme-card)] flex items-center justify-center text-[var(--theme-accent)] group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 leading-tight">
              <span className="text-[var(--theme-accent)]">$</span>
              <span>{PERSONAL_INFO.shortName}</span>
              <span className="text-white/40">.dev</span>
            </span>
            <span className="text-[10px] text-white/40 font-normal leading-none hidden sm:block">
              {t.nav.brandSub}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-mono-code"
        >
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded transition-colors duration-150 relative ${
                  isActive
                    ? 'text-[var(--theme-accent)] font-semibold bg-[var(--theme-badge-bg)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label[language]}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--theme-accent)] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls: Animation Toggle, Theme, Language, Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Animation Toggle */}
          <button
            type="button"
            onClick={toggleAnimations}
            title={animationsEnabled ? t.nav.animationActive : t.nav.animationPaused}
            aria-label={animationsEnabled ? t.nav.animationActive : t.nav.animationPaused}
            className={`p-2 rounded border transition-colors ${
              animationsEnabled
                ? 'border-[var(--theme-border)] text-[var(--theme-accent)] bg-[var(--theme-badge-bg)]'
                : 'border-white/10 text-white/40 hover:text-white/70 bg-white/5'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]`}
          >
            {animationsEnabled ? (
              <Play className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Pause className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>

          {/* Theme Selector Dropdown */}
          <div ref={themeDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setThemeDropdownOpen((prev) => !prev);
                setLangDropdownOpen(false);
              }}
              title={t.nav.toggleTheme}
              aria-label={t.nav.toggleTheme}
              aria-haspopup="menu"
              aria-expanded={themeDropdownOpen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-code rounded border border-[var(--theme-border)] text-white/90 bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span className="hidden sm:inline capitalize font-medium">{theme}</span>
            </button>

            {themeDropdownOpen && (
              <div
                role="menu"
                aria-label="Select Theme"
                className="absolute right-0 mt-2 w-72 p-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono-code text-white/50 border-b border-white/10 mb-1">
                  {t.nav.toggleTheme}
                </div>
                {THEME_CONFIGS.map((cfg) => (
                  <button
                    key={cfg.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleThemeSelect(cfg.id)}
                    className={`w-full text-left px-2.5 py-2 rounded text-xs transition-colors ${
                      theme === cfg.id
                        ? 'bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-semibold border border-[var(--theme-border)]'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full ring-1 ring-white/20 shrink-0"
                          style={{ backgroundColor: cfg.accentColor }}
                          aria-hidden="true"
                        />
                        <span className="font-medium">{cfg.name[language]}</span>
                      </div>
                      <span className="text-[10px] font-mono-code text-white/40">{cfg.badge}</span>
                    </div>
                    <div className="text-[10.5px] text-white/50 pl-4.5 mt-1 leading-snug">
                      {cfg.description[language]}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher Dropdown */}
          <div ref={langDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLangDropdownOpen((prev) => !prev);
                setThemeDropdownOpen(false);
              }}
              title={t.nav.toggleLang}
              aria-label={t.nav.toggleLang}
              aria-haspopup="menu"
              aria-expanded={langDropdownOpen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-code rounded border border-[var(--theme-border)] text-white/90 bg-[var(--theme-card)] hover:border-[var(--theme-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)]" aria-hidden="true" />
              <span className="font-semibold uppercase">{language}</span>
            </button>

            {langDropdownOpen && (
              <div
                role="menu"
                aria-label="Select Language"
                className="absolute right-0 mt-2 w-36 p-1 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="px-2 py-1 text-[10px] font-mono-code text-white/50 border-b border-white/10 mb-1">
                  {t.nav.toggleLang}
                </div>
                {LANGUAGES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleLangSelect(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors font-mono-code ${
                      language === item.id
                        ? 'bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-semibold'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-white/40">{item.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 rounded border border-[var(--theme-border)] text-white/80 hover:text-white bg-[var(--theme-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)]"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--theme-border)] bg-[var(--theme-surface)]/95 backdrop-blur-xl px-4 py-4 space-y-3 font-mono-code text-sm">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[var(--theme-badge-bg)] text-[var(--theme-accent)] font-semibold border-l-2 border-[var(--theme-accent)]'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label[language]}</span>
                  <span className="text-[10px] text-white/30">&gt;</span>
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
            <span className="text-[11px] text-[var(--theme-accent)]">MCBU</span>
          </div>
        </div>
      )}
    </header>
  );
}
