'use client';

import React from 'react';
import { PortfolioProvider } from '@/context/portfolio-context';
import { AnimatedBackground } from '@/components/background/AnimatedBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen text-slate-100 selection:bg-[var(--theme-accent)] selection:text-black flex flex-col justify-between">
        {/* Animated Canvas Background (Matrix / Quantum / Gothic with pause support) */}
        <AnimatedBackground />

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <div className="relative z-10 flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
