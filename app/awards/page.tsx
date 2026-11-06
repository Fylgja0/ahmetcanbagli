import React from 'react';
import { notFound } from 'next/navigation';
import { getAdmin } from '@/lib/auth';
import { getAwardsVisibility } from '@/lib/settings';
import { getPublishedAwards } from '@/app/actions/awards';
import { AwardsContent } from '@/components/sections/AwardsContent';

export const dynamic = 'force-dynamic';

export default async function AwardsPage() {
  const [isVisible, admin] = await Promise.all([
    getAwardsVisibility(),
    getAdmin(),
  ]);

  // If awards are hidden on the public site and no admin session exists, return 404
  if (!isVisible && !admin) {
    notFound();
  }

  const awards = await getPublishedAwards();
  const featuredAwards = awards.slice(0, 4);

  return (
    <AwardsContent
      awards={awards}
      featuredAwards={featuredAwards}
      isVisible={isVisible}
    />
  );
}
