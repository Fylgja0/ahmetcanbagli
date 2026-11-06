import React from 'react';
import { getAwardsVisibility } from '@/lib/settings';
import { getPublishedAwards } from '@/app/actions/awards';
import { HomeAwardsTeaserClient } from './HomeAwardsTeaserClient';

export async function HomeAwardsTeaser() {
  const isVisible = await getAwardsVisibility();
  if (!isVisible) {
    return null;
  }

  const awards = await getPublishedAwards(4);

  if (!awards || awards.length === 0) {
    return null;
  }

  return <HomeAwardsTeaserClient awards={awards} />;
}
export default HomeAwardsTeaser;
