// File: components/projects/ProjectForm.tsx
import React, { useState, useEffect } from 'react'
import { useProjectContext } from '@/contexts/ProjectContext'
import { Project, InsertTables } from '@/types/supabase'

interface ProjectFormProps {
  project?: Project // If provided, we're editing an existing project
  onSubmit?: () => void // Optional callback for after submission
}


interface ProjectFormProps {
  project?: Project
  onSubmit?: () => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit }) => {
  const { createProject, updateProject } = useProjectContext()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (project) {
      setName(project.name)
      setDescription(project.description || '')
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (project) {
      updateProject({ id: project.id, name, description })
    } else {
      const newProject: InsertTables<'projects'> = {
        name, description,
        user_id: ''
      }
      createProject(newProject)
    }

    setName('')
    setDescription('')
    if (onSubmit) onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm