// File: app/projects/page.tsx
import { createClient } from '@/utils/supabase/server'
import ProjectList from './ProjectList'

export default async function Projects() {
  const supabase = createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
  
  if (error) {
    console.error('Error fetching projects:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ProjectList initialProjects={projects || []} />
    </div>
  )
}