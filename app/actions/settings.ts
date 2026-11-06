'use server';

import { requireAdmin } from '@/lib/auth';
import { setAwardsVisibility, getAwardsVisibility } from '@/lib/settings';
import { revalidatePath } from 'next/cache';

/**
 * Ödüller sayfasının ana sitedeki görünürlük durumunu tersine çevirir (Aktif/Pasif).
 */
export async function toggleAwardsVisibilityAction(_formData?: FormData): Promise<void> {
  await requireAdmin();

  const current = await getAwardsVisibility();
  const next = !current;
  await setAwardsVisibility(next);

  revalidatePath('/');
  revalidatePath('/oduller');
  revalidatePath('/admin');
  revalidatePath('/admin/oduller');
}

/**
 * Ödüller sayfasının görünürlüğünü doğrudan belirler.
 */
export async function setAwardsVisibilityAction(visible: boolean): Promise<void> {
  await requireAdmin();

  await setAwardsVisibility(visible);

  revalidatePath('/');
  revalidatePath('/oduller');
  revalidatePath('/admin');
  revalidatePath('/admin/oduller');
}

