// components/ProtectedRoute.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    router.push('/auth/signin')
    return null
  }

  return <>{children}</>
}