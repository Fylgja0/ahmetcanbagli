import React from 'react';
import {
  getAdminSessionsData,
  revokeOtherSessionsAction,
  purgeExpiredSessionsAction,
} from '@/app/actions/sessions';
import { AdminSessionsClient } from '@/components/admin/AdminSessionsClient';

export const dynamic = 'force-dynamic';

export default async function SessionsAdminPage() {
  const { sessions } = await getAdminSessionsData();

  return (
    <AdminSessionsClient
      sessions={sessions}
      onPurgeExpired={purgeExpiredSessionsAction}
      onRevokeOthers={revokeOtherSessionsAction}
    />
  );
}
