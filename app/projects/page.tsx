import React from 'react';
import { Metadata } from 'next';
import { PageBreadcrumb } from '@/components/ui/PageBreadcrumb';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { PageFooterNavigation } from '@/components/ui/PageFooterNavigation';
import { getLiveProjects } from '@/app/actions/projects';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects & Technical Breakdown',
  description:
    'C#/.NET 10 database applications, interactive data storytelling platforms, and Python machine learning pipelines.',
};

export default async function ProjectsPage() {
  const projects = await getLiveProjects();

  return (
    <div className="py-4 min-h-[80vh] flex flex-col justify-between">
      <div>
        <PageBreadcrumb
          currentPageKey="projects"
          badge="03_PROJECTS"
          prevPage={{ href: '/skills', labelKey: 'skills' }}
          nextPage={{ href: '/education', labelKey: 'education' }}
        />
        <ProjectsSection initialProjects={projects} />
      </div>
      <PageFooterNavigation
        prevPage={{ href: '/skills', labelKey: 'skills', badge: '02_SKILLS' }}
        nextPage={{ href: '/education', labelKey: 'education', badge: '04_EDUCATION' }}
      />
    </div>
  );
}
