// File: app/projects/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function ProjectDetail({ params: { id } }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })
  const { data: project, error } = await supabase
    .from('projects')
    .select('*, measurements(*), estimates(*)')
    .eq('id', id)
    .single()

  if (error || !project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p>{project.description}</p>
      
      <h2 className="text-xl font-semibold mt-6 mb-2">Measurements</h2>
      {project.measurements && project.measurements.length > 0 ? (
        <ul>
          {project.measurements.map((measurement: { id: string, type: string, value: number, unit: string }) => (
            <li key={measurement.id}>
              {measurement.type}: {measurement.value} {measurement.unit}
            </li>
          ))}
        </ul>
      ) : (
        <p>No measurements recorded yet.</p>
      )}

      <h2 className="text-xl font-semibold mt-6 mb-2">Estimates</h2>
      {project.estimates && project.estimates.length > 0 ? (
        <ul>
          {project.estimates.map((estimate: { id: string, name: string, total_cost: number }) => (
            <li key={estimate.id}>
              {estimate.name}: ${estimate.total_cost}
            </li>
          ))}
        </ul>
      ) : (
        <p>No estimates created yet.</p>
      )}
    </div>
  )
}
