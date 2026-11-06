'use server';

import { requireAdmin } from '@/lib/auth';
import { setAwardsVisibility, getAwardsVisibility } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

/**
 * Ödüller sayfasının ana sitedeki görünürlük durumunu tersine çevirir (Aktif/Pasif).
 */
export async function toggleAwardsVisibilityAction(): Promise<void> {
  await requireAdmin();

  const current = await getAwardsVisibility();
  const next = !current;
  await setAwardsVisibility(next);

  revalidatePath('/');
  revalidatePath('/awards');
  revalidatePath('/oduller');
  revalidatePath('/admin');
  revalidatePath('/admin/awards');
  revalidatePath('/admin/oduller');
}

/**
 * Ödüller sayfasının görünürlüğünü doğrudan belirler.
 */
export async function setAwardsVisibilityAction(visible: boolean): Promise<void> {
  await requireAdmin();

  await setAwardsVisibility(visible);

  revalidatePath('/');
  revalidatePath('/awards');
  revalidatePath('/oduller');
  revalidatePath('/admin');
  revalidatePath('/admin/awards');
  revalidatePath('/admin/oduller');
}

