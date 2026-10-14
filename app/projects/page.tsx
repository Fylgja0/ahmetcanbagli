'use client';

import React from 'react';
import { usePortfolio } from '@/context/portfolio-context';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';

export default function ProjectsPage() {
  const { t } = usePortfolio();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPage={t.nav.projects}
          badge="03_PROJECTS"
          prevPage={{ href: '/skills', label: t.nav.skills }}
          nextPage={{ href: '/education', label: t.nav.education }}
        />
        <ProjectsSection />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/skills', label: t.nav.skills, badge: '02_SKILLS' }}
        nextPage={{ href: '/education', label: t.nav.education, badge: '04_EDUCATION' }}
      />
    </div>
  );
}
