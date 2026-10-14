'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function SkillsPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.skills}
          badge="02_SKILLS"
          prevPage={{ href: '/about', label: t.nav.about }}
          nextPage={{ href: '/projects', label: t.nav.projects }}
        />
        <SkillsSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/about', label: t.nav.about, badge: '01_ABOUT' }}
        nextPage={{ href: '/projects', label: t.nav.projects, badge: '03_PROJECTS' }}
      />
    </div>
  );
}
