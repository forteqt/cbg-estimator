// File: lib/supabase/middleware.ts

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

export const createMiddlewareSupabaseClient = (req: NextRequest) => {
  const res = NextResponse.next()
  return createMiddlewareClient<Database>({ req, res })
}