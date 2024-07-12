// File: app/projects/page.tsx
'use client';
import ProjectList from '@/components/projects/ProjectList'
import { ProjectProvider } from '@/contexts/ProjectContext';
import { Suspense } from 'react'


export default function ProjectsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectProvider>
          <ProjectList />
        </ProjectProvider>
      </Suspense>
    </div>
  )
}
