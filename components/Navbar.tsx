// File: components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import AuthButton from '@/components/AuthButton'

const Navbar = () => {
  const { user } = useAuth()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">CBGTI Estimator</Link>
        <div className="space-x-4">
          {user && (
            <>
              <Link href="/projects" className="hover:text-gray-300">Projects</Link>
              <Link href="/takeoff" className="hover:text-gray-300">Takeoff</Link>
              <Link href="/estimate" className="hover:text-gray-300">Estimate</Link>
              <Link href="/reports" className="hover:text-gray-300">Reports</Link>
            </>
          )}
          <AuthButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar