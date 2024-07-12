// File: app/projects/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Projects() {
  const supabase = createServerComponentClient({ cookies })
  const { data: projects, error } = await supabase.from('projects').select('*')

  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      {projects && projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <Link href={`/projects/${project.id}`} className="text-blue-500 hover:underline">
                {project.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found. Create a new project to get started!</p>
      )}
      <Link href="/projects/new" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Create New Project
      </Link>
    </div>
  )
}