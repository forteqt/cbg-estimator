// File: middleware.ts (updated)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && !req.nextUrl.pathname.startsWith('/signin')) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  if (session && (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/projects', req.url))
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}