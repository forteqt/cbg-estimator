// File: app/projects/ProjectList.tsx
'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ProjectList({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const supabase = createClientComponentClient()

  const createProject = async () => {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name: `New Project ${projects.length + 1}`, description: 'Project description' }])
      .select()

    if (error) {
      console.error('Error creating project:', error)
    } else if (data) {
      setProjects([...projects, ...data])
    }
  }

  return (
    <div>
      <button
        onClick={createProject}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create New Project
      </button>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}