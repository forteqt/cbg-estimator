// File: components/projects/ProjectCard.tsx
import React from 'react'
import { Project } from '@/types/supabase'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow">
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p className="text-gray-600">{project.description}</p>
      <div className="mt-4">
        <button
          onClick={() => onEdit(project)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProjectCard