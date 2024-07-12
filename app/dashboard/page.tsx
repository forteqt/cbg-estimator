// app/dashboard/page.tsx
import ProtectedRoute from '@/components/ProtectedRoute'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-xl">This is a protected page. Only authenticated users can see this.</p>
      </div>
    </ProtectedRoute>
  )
}