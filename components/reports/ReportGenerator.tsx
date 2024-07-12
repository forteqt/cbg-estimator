// File: components/reports/ReportGenerator.tsx
import React, { useState } from 'react'
import { useProjects } from '@/lib/hooks/useProjects'
import { useEstimates } from '@/lib/hooks/useEstimates'
import { useTakeoff } from '@/lib/hooks/useTakeoff'

const ReportGenerator: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const { projects } = useProjects()
  const { estimates } = useEstimates()
  const { measurements } = useTakeoff(selectedProjectId || '')

  const generateReport = () => {
    if (!selectedProjectId) return

    const project = projects.find(p => p.id === selectedProjectId)
    const projectEstimates = estimates.filter(e => e.project_id === selectedProjectId)
    const projectMeasurements = measurements

    // Here you would typically format this data into a report
    // For this example, we'll just log it to the console
    console.log('Report for project:', project?.name)
    console.log('Estimates:', projectEstimates)
    console.log('Measurements:', projectMeasurements)

    // In a real application, you might want to generate a PDF or
    // send this data to a backend to generate a report
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Report Generator</h2>
      <div>
        <label htmlFor="projectSelect" className="block">Select Project:</label>
        <select
          id="projectSelect"
          value={selectedProjectId || ''}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={generateReport}
        disabled={!selectedProjectId}
        className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        Generate Report
      </button>
    </div>
  )
}

export default ReportGenerator