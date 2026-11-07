import { ProjectCategory } from './portfolio';

export interface AdminUser {
  id: number;
  email: string;
}

export interface ProjectRecord {
  id: number;
  slug: string | null;
  title: string;
  category: ProjectCategory;
  githubUrl: string | null;
  liveUrl: string | null;
  technologies: string | null;
  summary: string;
  details: string | null;
  isFeatured: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  message: string;
  consentGiven: boolean;
  isRead: boolean;
  createdAt: string;
}

export interface DeletionAuditLog {
  id: number;
  anonymizedCount: number;
  executedAt: string;
}

export interface AdminSession {
  tokenPreview: string;
  isCurrentDevice: boolean;
  adminId: number;
  expiresAt: string;
  lastActiveAt: string;
  userAgent: string | null;
}

export interface DashboardMetrics {
  totalAwards: number;
  totalProjects: number;
  unreadMessages: number;
  totalMessages: number;
  activeSessions: number;
  awardsVisible: boolean;
}
