import React from 'react';
import { sql } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { toggleAwardsVisibilityAction } from '@/app/actions/settings';
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient';
import { DashboardMetrics } from '@/types/admin';

export const dynamic = 'force-dynamic';

export default async function AdminHomePage() {
  const admin = await requireAdmin();

  const metrics: DashboardMetrics = {
    totalAwards: 0,
    totalProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    activeSessions: 1,
    awardsVisible: true,
  };

  try {
    const [
      awardCountRes,
      projectCountRes,
      messageCountRes,
      unreadCountRes,
      sessionCountRes,
      visibility,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int AS total FROM oduller`,
      sql`SELECT COUNT(*)::int AS total FROM projeler`.catch(() => [{ total: 0 }]),
      sql`SELECT COUNT(*)::int AS total FROM iletisim_mesajlari`,
      sql`SELECT COUNT(*)::int AS unread FROM iletisim_mesajlari WHERE okundu = false`,
      sql`SELECT COUNT(*)::int AS active_sessions FROM oturumlar WHERE bitis > now() AND son_aktivite > now() - interval '30 minutes'`,
      getAwardsVisibility(),
    ]);

    metrics.totalAwards = Number(awardCountRes[0]?.total || 0);
    metrics.totalProjects = Number(projectCountRes[0]?.total || 0);
    metrics.totalMessages = Number(messageCountRes[0]?.total || 0);
    metrics.unreadMessages = Number(unreadCountRes[0]?.unread || 0);
    metrics.activeSessions = Number(sessionCountRes[0]?.active_sessions || 1);
    metrics.awardsVisible = visibility;
  } catch (e) {
    console.error('Failed to load dashboard metrics:', e);
  }

  return (
    <AdminDashboardClient
      adminEmail={admin.email}
      metrics={metrics}
      onToggleAwardsVisibility={toggleAwardsVisibilityAction}
    />
  );
}
