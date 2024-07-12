// File: middleware.ts

import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient(req)

  // Check auth state
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth redirect logic
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')

  if (!session && !isAuthPage && !isApiRoute) {
    // Redirect unauthenticated users to login page
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/auth/signin'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (session && isAuthPage) {
    // Redirect authenticated users to dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}