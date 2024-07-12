// File: components/projects/ProjectList.tsx
import React, { useState } from 'react'
import { useProjectContext } from '@/contexts/ProjectContext'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'
import { Project } from '@/types/supabase'

const ProjectList: React.FC = () => {
  const { projects, isLoading, isError, deleteProject } = useProjectContext()
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  if (isLoading) return <div>Loading projects...</div>
  if (isError) return <div>Error loading projects</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ProjectForm onSubmit={() => setEditingProject(null)} />
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => setEditingProject(project)}
          onDelete={() => deleteProject(project.id)}
        />
      ))}
      {editingProject && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Edit Project</h3>
          <ProjectForm
            project={editingProject}
            onSubmit={() => setEditingProject(null)}
          />
        </div>
      )}
    </div>
  )
}

export default ProjectList;