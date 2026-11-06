import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomeSectionsNavigator } from '@/components/sections/HomeSectionsNavigator';
import { HomeAwardsTeaser } from '@/components/sections/HomeAwardsTeaser';
import { HomeFeaturedTeaser } from '@/components/sections/HomeFeaturedTeaser';
import { getLiveProjects } from '@/app/actions/projects';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const projects = await getLiveProjects();

  return (
    <div className="space-y-10">
      {/* Hero Introduction & Live Interactive Terminal */}
      <HeroSection />

      {/* Interactive Multi-Page Navigation Hub */}
      <HomeSectionsNavigator />

      {/* Featured Awards & Honors Teaser */}
      <HomeAwardsTeaser />

      {/* Featured Projects Highlights & Quick Contact CTA */}
      <HomeFeaturedTeaser initialProjects={projects} />
    </div>
  );
}
