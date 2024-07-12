
// File: components/AppContent.tsx
'use client'

import { useAuth } from "../auth/AuthProvider"
import Navbar from "../layouts/Navbar"
import Sidebar from "../layouts/Sidebar"
import LoadingSpinner from "./LoadingSpinner"

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </>
  )
}