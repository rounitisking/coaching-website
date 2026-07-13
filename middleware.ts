import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const role = (req.auth?.user as { role?: string } | undefined)?.role

  if (pathname.startsWith('/dashboard') && !isLoggedIn) {
    const url = new URL('/auth', req.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      const url = new URL('/auth', req.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  if (pathname === '/auth' && isLoggedIn) {
    const callbackUrl = req.nextUrl.searchParams.get('callbackUrl')
    const dest = callbackUrl || (role === 'ADMIN' ? '/admin' : '/dashboard')
    return NextResponse.redirect(new URL(dest, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth'],
}
