export type ThemeId = 'matrix' | 'quantum' | 'gothic';

export type LanguageId = 'tr' | 'en' | 'de' | 'ru';

export interface ThemeConfig {
  id: ThemeId;
  name: Record<LanguageId, string>;
  accentColor: string;
  badge: string;
  description: Record<LanguageId, string>;
}

export interface ProjectArchitectureLayer {
  layer: string;
  role: string;
  details: string;
}

export interface ProjectHighlight {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'backend' | 'datascience';
  githubUrl: string;
  technologies: string[];
  tagline: Record<LanguageId, string>;
  overview: Record<LanguageId, string>;
  keyConcepts: Record<LanguageId, string[]>;
  architecture: Record<LanguageId, ProjectArchitectureLayer[]>;
  engineeringInsights: Record<LanguageId, string[]>;
  futureRoadmap: Record<LanguageId, string[]>;
  highlights: Record<LanguageId, ProjectHighlight[]>;
}

export interface SkillItem {
  name: Record<LanguageId, string>;
  context: Record<LanguageId, string>;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  title: Record<LanguageId, string>;
  description: Record<LanguageId, string>;
  icon: string;
  skills: SkillItem[];
}

export interface EducationItem {
  id: string;
  institution: Record<LanguageId, string>;
  degree?: Record<LanguageId, string>;
  department: Record<LanguageId, string>;
  location: Record<LanguageId, string>;
  period: Record<LanguageId, string>;
  status: Record<LanguageId, string>;
  description: Record<LanguageId, string>;
  keyCoursework: Record<LanguageId, string[]>;
  practicalFocus: Record<LanguageId, string[]>;
}

export interface FocusItem {
  id: string;
  topic: Record<LanguageId, string>;
  description: Record<LanguageId, string>;
  technologies: string[];
  status: Record<LanguageId, string>;
}

export interface NavItem {
  label: Record<LanguageId, string>;
  href: string;
}
