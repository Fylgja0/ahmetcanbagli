import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomeSectionsNavigator } from '@/components/sections/HomeSectionsNavigator';
import { HomeFeaturedTeaser } from '@/components/sections/HomeFeaturedTeaser';

export default function Home() {
  return (
    <main className="space-y-6">
      {/* Hero Introduction & Live Interactive Terminal */}
      <HeroSection />

      {/* Interactive Multi-Page Navigation Hub */}
      <HomeSectionsNavigator />

      {/* Featured Projects Highlights & Quick Contact CTA */}
      <HomeFeaturedTeaser />
    </main>
  );
}
