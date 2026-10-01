'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeId, LanguageId, Project } from '@/types/portfolio';
import { translations, UiTranslations } from '@/lib/translations';

interface PortfolioContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  language: LanguageId;
  setLanguage: (lang: LanguageId) => void;
  animationsEnabled: boolean;
  toggleAnimations: () => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  t: UiTranslations;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

const STORAGE_THEME_KEY = 'portfolio_theme';
const STORAGE_LANG_KEY = 'portfolio_lang';
const STORAGE_ANIM_KEY = 'portfolio_animations';

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('matrix');
  const [language, setLanguageState] = useState<LanguageId>('en');
  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initialize from localStorage or preferences on client mount asynchronously
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      try {
        const storedTheme = localStorage.getItem(STORAGE_THEME_KEY) as ThemeId | null;
        if (storedTheme && ['matrix', 'quantum', 'gothic'].includes(storedTheme)) {
          setThemeState(storedTheme);
          document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
          document.documentElement.setAttribute('data-theme', 'matrix');
        }

        let effectiveLang: LanguageId = 'en';
        const storedLang = localStorage.getItem(STORAGE_LANG_KEY) as LanguageId | null;
        if (storedLang && ['tr', 'en', 'de', 'ru'].includes(storedLang)) {
          effectiveLang = storedLang;
        } else {
          // Detect browser language if possible
          const browserLang = navigator.language.toLowerCase();
          if (browserLang.startsWith('tr')) effectiveLang = 'tr';
          else if (browserLang.startsWith('de')) effectiveLang = 'de';
          else if (browserLang.startsWith('ru')) effectiveLang = 'ru';
          else effectiveLang = 'en';
        }
        setLanguageState(effectiveLang);
        document.documentElement.lang = effectiveLang;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const storedAnim = localStorage.getItem(STORAGE_ANIM_KEY);
        if (storedAnim !== null) {
          setAnimationsEnabledState(storedAnim === 'true');
        } else if (prefersReducedMotion) {
          setAnimationsEnabledState(false);
        }
      } catch {
        // Fallback silently if localStorage is restricted
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_THEME_KEY, newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {
      // Ignore
    }
  };

  const setLanguage = (newLang: LanguageId) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore
    }
  };

  const toggleAnimations = () => {
    setAnimationsEnabledState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_ANIM_KEY, String(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const t = translations[language];

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        setTheme,
        language,
        setLanguage,
        animationsEnabled,
        toggleAnimations,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
        t,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
