
// File: components/AuthButton.tsx (updated)
'use client'

import { useAuth } from '@/components/AuthProvider'
import Link from 'next/link'

export default function AuthButton() {
  const { user } = useAuth()

  return user ? (
    <Link href="/signout" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      Sign Out
    </Link>
  ) : (
    <Link href="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Sign In
    </Link>
  )
}
