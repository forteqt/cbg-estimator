// File: lib/hooks/useTakeoff.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClientSupabaseClient } from '@/lib/supabase/client'
import { Measurement, InsertTables, UpdateTables } from '@/types/supabase'

export const useTakeoff = (projectId: string) => {
  const supabase = createClientSupabaseClient()
  const queryClient = useQueryClient()

  const fetchMeasurements = async (): Promise<Measurement[]> => {
    const { data, error } = await supabase
      .from('measurements')
      .select('*')
      .eq('project_id', projectId)
    if (error) throw error
    return data
  }

  const createMeasurement = async (newMeasurement: InsertTables<'measurements'>): Promise<Measurement> => {
    const { data, error } = await supabase
      .from('measurements')
      .insert({ ...newMeasurement, project_id: projectId })
      .single()
    if (error) throw error
    return data
  }

  const updateMeasurement = async ({ id, ...updateData }: UpdateTables<'measurements'> & { id: string }): Promise<Measurement> => {
    const { data, error } = await supabase
      .from('measurements')
      .update(updateData)
      .eq('id', id)
      .eq('project_id', projectId)
      .single()
    if (error) throw error
    return data
  }

  const deleteMeasurement = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('measurements')
      .delete()
      .eq('id', id)
      .eq('project_id', projectId)
    if (error) throw error
  }

  const measurementsQuery = useQuery<Measurement[], Error>({
    queryKey: ['measurements', projectId],
    queryFn: fetchMeasurements
  })
  const createMeasurementMutation = useMutation<Measurement, Error, InsertTables<'measurements'>>({
    mutationFn: createMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', projectId] })
    },
  })

  const updateMeasurementMutation = useMutation<Measurement, Error, UpdateTables<'measurements'> & { id: string }>({
    mutationFn: updateMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', projectId] })
    },
  })

  const deleteMeasurementMutation = useMutation<void, Error, string>({
    mutationFn: deleteMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', projectId] })
    },
  })

  return {
    measurements: measurementsQuery.data ?? [],
    isLoading: measurementsQuery.isLoading,
    isError: measurementsQuery.isError,
    error: measurementsQuery.error,
    createMeasurement: createMeasurementMutation.mutate,
    updateMeasurement: updateMeasurementMutation.mutate,
    deleteMeasurement: deleteMeasurementMutation.mutate,
  }
}