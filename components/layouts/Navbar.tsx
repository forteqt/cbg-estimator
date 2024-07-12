// File: components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

const Navbar = () => {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">CBGTI Estimator</Link>
        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.email}</span>
              <button onClick={signOut} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar