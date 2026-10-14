'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { EducationSection } from '@/components/sections/EducationSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function EducationPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.education}
          badge="04_EDUCATION"
          prevPage={{ href: '/projects', label: t.nav.projects }}
          nextPage={{ href: '/focus', label: t.nav.currentFocus }}
        />
        <EducationSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/projects', label: t.nav.projects, badge: '03_PROJECTS' }}
        nextPage={{ href: '/focus', label: t.nav.currentFocus, badge: '05_FOCUS' }}
      />
    </div>
  );
}
