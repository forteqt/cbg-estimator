// File: lib/hooks/useProjects.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientSupabaseClient } from '@/lib/supabase/client'
import { Project, InsertTables, UpdateTables } from '@/types/supabase'

export const useProjects = () => {
  const supabase = createClientSupabaseClient()
  const queryClient = useQueryClient()

  const fetchProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
    if (error) throw error
    return data
  }

  const createProject = async (newProject: InsertTables<'projects'>): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .insert(newProject)
      .single()
    if (error) throw error
    return data
  }

  const updateProject = async ({ id, ...updateData }: UpdateTables<'projects'> & { id: string }): Promise<Project> => {
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  const deleteProject = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  const projectsQuery = useQuery<Project[], Error>({
    queryKey: ['protjects'],
    queryFn: fetchProjects
  })

  const createProjectMutation = useMutation<Project, Error, InsertTables<'projects'>>({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const updateProjectMutation = useMutation<Project, Error, UpdateTables<'projects'> & { id: string }>({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  const deleteProjectMutation = useMutation<void, Error, string>({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })

  return {
    projects: projectsQuery.data ?? [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
  }
}