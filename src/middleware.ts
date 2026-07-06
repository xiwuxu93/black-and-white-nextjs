import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    // e.g. /about -> /en/about
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url),
      308 // Permanent redirect
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files with extensions
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|ads.txt|.*\\..*).*)',
  ],
}
