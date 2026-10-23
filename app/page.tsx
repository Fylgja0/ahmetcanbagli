import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { HomeSectionsNavigator } from '@/components/sections/HomeSectionsNavigator';
import { HomeAwardsTeaser } from '@/components/sections/HomeAwardsTeaser';
import { HomeFeaturedTeaser } from '@/components/sections/HomeFeaturedTeaser';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="space-y-10">
      {/* Hero Introduction & Live Interactive Terminal */}
      <HeroSection />

      {/* Interactive Multi-Page Navigation Hub */}
      <HomeSectionsNavigator />

      {/* Görev 5 & 3.2: Öne Çıkan Ödüller & Başarılar (oduller tablosu) */}
      <HomeAwardsTeaser />

      {/* Featured Projects Highlights & Quick Contact CTA */}
      <HomeFeaturedTeaser />
    </main>
  );
}
