import React from 'react';
import { PortfolioProvider } from '@/context/portfolio-context';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { CurrentFocusSection } from '@/components/sections/CurrentFocusSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen text-slate-100 selection:bg-[var(--theme-accent)] selection:text-black">
        {/* Animated Canvas Background (Matrix / Quantum / Gothic with pause support) */}
        <AnimatedBackground />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-4">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <EducationSection />
          <CurrentFocusSection />
          <ContactSection />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
