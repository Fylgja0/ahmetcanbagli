import React from 'react';
import { requireAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { toggleAwardsVisibilityAction } from '@/app/actions/settings';
import {
  getAdminAwardsData,
  createAwardAction,
  updateAwardAction,
  toggleAwardPublishAction,
  deleteAwardAction,
} from '@/app/actions/awards';
import { AdminAwardsClient } from '@/components/admin/AdminAwardsClient';

export const dynamic = 'force-dynamic';

interface AwardsAdminPageProps {
  searchParams?: Promise<{ edit?: string }>;
}

export default async function AwardsAdminPage(props: AwardsAdminPageProps) {
  await requireAdmin();

  const searchParams = await props.searchParams;
  const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

  const [awardsVisible, { awards, categories, editingAward }] = await Promise.all([
    getAwardsVisibility(),
    getAdminAwardsData(editId),
  ]);

  return (
    <AdminAwardsClient
      awards={awards}
      categories={categories}
      editingAward={editingAward}
      awardsVisible={awardsVisible}
      onToggleVisibility={toggleAwardsVisibilityAction}
      onAdd={createAwardAction}
      onUpdate={updateAwardAction}
      onTogglePublish={toggleAwardPublishAction}
      onDelete={deleteAwardAction}
    />
  );
}
