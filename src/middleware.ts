import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAccess = request.cookies.get('guias-access')?.value === 'granted'
  const isLoginRoute = request.nextUrl.pathname === '/guias/login'

  if (!isLoginRoute && !hasAccess) {
    const url = request.nextUrl.clone()
    url.pathname = '/guias/login'
    return NextResponse.redirect(url)
  }

  if (isLoginRoute && hasAccess) {
    const url = request.nextUrl.clone()
    url.pathname = '/guias'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/guias/:path*'],
}
