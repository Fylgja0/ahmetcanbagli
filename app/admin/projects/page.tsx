import React from 'react';
import { requireAdmin } from '@/lib/auth';
import {
  getAdminProjectsData,
  createProjectAction,
  updateProjectAction,
  toggleProjectPublishAction,
  toggleProjectFeaturedAction,
  deleteProjectAction,
} from '@/app/actions/projects';
import { AdminProjectsClient } from '@/components/admin/AdminProjectsClient';

export const dynamic = 'force-dynamic';

interface ProjectsAdminPageProps {
  searchParams?: Promise<{ edit?: string }>;
}

export default async function ProjectsAdminPage(props: ProjectsAdminPageProps) {
  await requireAdmin();

  const searchParams = await props.searchParams;
  const editId = searchParams?.edit ? parseInt(searchParams.edit, 10) : null;

  const { projects, editingProject } = await getAdminProjectsData(editId);

  return (
    <AdminProjectsClient
      projects={projects}
      editingProject={editingProject}
      onAdd={createProjectAction}
      onUpdate={updateProjectAction}
      onTogglePublish={toggleProjectPublishAction}
      onToggleFeatured={toggleProjectFeaturedAction}
      onDelete={deleteProjectAction}
    />
  );
}
