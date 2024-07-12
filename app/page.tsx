// File: app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButton from '@/components/AuthButton'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to CBGTI Estimator
        </h1>
        <div className="mt-8">
          <AuthButton />
        </div>
        {user && (
          <p className="mt-4">You're signed in as {user.email}. Start using the estimator!</p>
        )}
      </main>
    </div>
  )
}