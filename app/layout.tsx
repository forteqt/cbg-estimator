// File: app/layout.tsx
import { AuthProvider } from '@/components/AuthProvider'
import Navbar from '@/components/Navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import './globals.css'

export const metadata = {
  title: 'CBGTI Estimator',
  description: 'Construction estimation tool',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}