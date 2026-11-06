import React from 'react';
import {
  getAdminSessionsData,
  revokeOtherSessionsAction,
  purgeExpiredSessionsAction,
} from '@/app/actions/sessions';
import { AdminSessionsClient } from '@/components/admin/AdminSessionsClient';

export const dynamic = 'force-dynamic';

export default async function SessionsAdminPage() {
  const { sessions, currentToken } = await getAdminSessionsData();

  return (
    <AdminSessionsClient
      sessions={sessions}
      currentToken={currentToken}
      onPurgeExpired={purgeExpiredSessionsAction}
      onRevokeOthers={revokeOtherSessionsAction}
    />
  );
}
