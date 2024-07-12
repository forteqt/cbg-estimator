// File: components/AuthProvider.tsx
'use client'

import { createClientSupabaseClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  signOut: () => Promise<void>
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signOut: async () => { },
  loading: true,
  error: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientSupabaseClient()
  const [error, setError] = useState<string | null>(null)
  // In AuthProvider.tsx

  useEffect(() => {
    const getUser = async () => {
      const timeoutId = setTimeout(() => {
        setLoading(false)
        setError('Authentication timed out. Please try again.')
      }, 10000) // 10 seconds timeout

      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)
        clearTimeout(timeoutId)
      } catch (error) {
        setError('An error occurred during authentication.')
        setLoading(false)
        clearTimeout(timeoutId)
      }
    }
    getUser()

    // ... rest of the effect
  }, [router, supabase])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
      router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
    router.push('/auth/signin')
  }

  return (
    <AuthContext.Provider value={{ user, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)