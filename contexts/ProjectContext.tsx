// File: contexts/ProjectContext.tsx
import React, { createContext, useContext, ReactNode } from 'react'
import { useProjects } from '@/lib/hooks/useProjects'
import { Project, InsertTables, UpdateTables } from '@/types/supabase'
import { UseMutateFunction } from '@tanstack/react-query'

interface ProjectContextType {
  projects: Project[]
  isLoading: boolean
  isError: boolean
  error: Error | null
  createProject: UseMutateFunction<Project, Error, InsertTables<'projects'>, unknown>
  updateProject: UseMutateFunction<Project, Error, UpdateTables<'projects'> & { id: string }, unknown>
  deleteProject: UseMutateFunction<void, Error, string, unknown>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const projectsData = useProjects()

  return (
    <ProjectContext.Provider value={projectsData}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}

// The rest of the file remains the same...