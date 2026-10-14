'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { AboutSection } from '@/components/sections/AboutSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function AboutPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.about}
          badge="01_ABOUT"
          prevPage={{ href: '/', label: t.nav.home }}
          nextPage={{ href: '/skills', label: t.nav.skills }}
        />
        <AboutSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/', label: t.nav.home, badge: '00_HOME' }}
        nextPage={{ href: '/skills', label: t.nav.skills, badge: '02_SKILLS' }}
      />
    </div>
  );
}
