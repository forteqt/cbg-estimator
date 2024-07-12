// File: components/estimates/EstimateForm.tsx
import React, { useState } from 'react'
import { useEstimates } from '@/lib/hooks/useEstimates'
import { InsertTables } from '@/types/supabase'

interface EstimateFormProps {
  projectId: string
}

const EstimateForm: React.FC<EstimateFormProps> = ({ projectId }) => {
  const { createEstimate } = useEstimates()
  const [name, setName] = useState('')
  const [totalCost, setTotalCost] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newEstimate: InsertTables<'estimates'> = {
      project_id: projectId,
      name,
      total_cost: parseFloat(totalCost),
    }
    createEstimate(newEstimate)
    setName('')
    setTotalCost('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block">Estimate Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="totalCost" className="block">Total Cost:</label>
        <input
          id="totalCost"
          type="number"
          value={totalCost}
          onChange={(e) => setTotalCost(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Estimate
      </button>
    </form>
  )
}

export default EstimateForm