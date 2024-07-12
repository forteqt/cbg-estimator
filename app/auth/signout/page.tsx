// app/auth/signout/page.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignOut() {
  const router = useRouter()

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut()
      router.push('/')
    }
    signOut()
  }, [router])

  return <div>Signing out...</div>
}
