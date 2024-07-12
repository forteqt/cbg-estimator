// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export const Navbar = () => {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold">
          My App
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/dashboard" className="text-white mr-4">
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}