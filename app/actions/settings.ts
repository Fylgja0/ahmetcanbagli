'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getAwardsVisibility, setAwardsVisibility } from '@/lib/settings';

/**
 * Server Action that toggles the public visibility of the Awards section and page.
 */
export async function toggleAwardsVisibilityAction(): Promise<void> {
  await requireAdmin();

  const current = await getAwardsVisibility();
  await setAwardsVisibility(!current);

  revalidatePath('/');
  revalidatePath('/awards');
  revalidatePath('/admin');
  revalidatePath('/admin/awards');
}
