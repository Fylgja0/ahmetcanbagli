import React from 'react';
import { requireAdmin } from '@/lib/auth';
import {
  getAdminMessagesData,
  markMessageReadAction,
  deleteMessageAction,
  anonymizeExpiredMessagesAction,
} from '@/app/actions/messages';
import { AdminMessagesClient } from '@/components/admin/AdminMessagesClient';

export const dynamic = 'force-dynamic';

export default async function MessagesAdminPage() {
  await requireAdmin();

  const { messages, auditLogs } = await getAdminMessagesData();

  return (
    <AdminMessagesClient
      messages={messages}
      auditLogs={auditLogs}
      onMarkRead={markMessageReadAction}
      onDelete={deleteMessageAction}
      onAnonymize={anonymizeExpiredMessagesAction}
    />
  );
}
