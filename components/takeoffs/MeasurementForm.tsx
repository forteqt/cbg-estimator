// File: components/takeoff/MeasurementForm.tsx
import React, { useState } from 'react'
import { useTakeoff } from '@/lib/hooks/useTakeoff'
import { InsertTables } from '@/types/supabase'

interface MeasurementFormProps {
  projectId: string
}

const MeasurementForm: React.FC<MeasurementFormProps> = ({ projectId }) => {
  const { createMeasurement } = useTakeoff(projectId)
  const [type, setType] = useState('')
  const [value, setValue] = useState('')
  const [unit, setUnit] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMeasurement: InsertTables<'measurements'> = {
      project_id: projectId,
      type,
      value: parseFloat(value),
      unit,
    }
    createMeasurement(newMeasurement)
    setType('')
    setValue('')
    setUnit('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block">Type:</label>
        <input
          id="type"
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="value" className="block">Value:</label>
        <input
          id="value"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="unit" className="block">Unit:</label>
        <input
          id="unit"
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Measurement
      </button>
    </form>
  )
}

export default MeasurementForm