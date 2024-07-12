// File: lib/hooks/useEstimates.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientSupabaseClient } from '@/lib/supabase/client'
import { Estimate, InsertTables, UpdateTables } from '@/types/supabase'

export const useEstimates = () => {
  const supabase = createClientSupabaseClient()
  const queryClient = useQueryClient()

  const fetchEstimates = async (): Promise<Estimate[]> => {
    const { data, error } = await supabase
      .from('estimates')
      .select('*')
    if (error) throw error
    return data
  }

  const createEstimate = async (newEstimate: InsertTables<'estimates'>): Promise<Estimate> => {
    const { data, error } = await supabase
      .from('estimates')
      .insert(newEstimate)
      .single()
    if (error) throw error
    return data
  }

  const updateEstimate = async ({ id, ...updateData }: UpdateTables<'estimates'> & { id: string }): Promise<Estimate> => {
    const { data, error } = await supabase
      .from('estimates')
      .update(updateData)
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  }

  const deleteEstimate = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('estimates')
      .delete()
      .eq('id', id)
    if (error) throw error
  }

  
  const estimatesQuery = useQuery<Estimate[], Error>({
    queryKey: ['estimates'],
    queryFn: fetchEstimates
  })

  const createEstimateMutation = useMutation<Estimate, Error, InsertTables<'estimates'>>({
    mutationFn: createEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
  })

  const updateEstimateMutation = useMutation<Estimate, Error, UpdateTables<'estimates'> & { id: string }>({
    mutationFn: updateEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
  })

  const deleteEstimateMutation = useMutation<void, Error, string>({
    mutationFn: deleteEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] })
    },
  })

  return {
    estimates: estimatesQuery.data ?? [],
    isLoading: estimatesQuery.isLoading,
    isError: estimatesQuery.isError,
    error: estimatesQuery.error,
    createEstimate: createEstimateMutation.mutate,
    updateEstimate: updateEstimateMutation.mutate,
    deleteEstimate: deleteEstimateMutation.mutate,
  }
}