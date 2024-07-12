// File: app/signout/page.tsx
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignOut() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }
    signOut()
  }, [supabase, router])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <p>Signing out...</p>
    </div>
  )
}
