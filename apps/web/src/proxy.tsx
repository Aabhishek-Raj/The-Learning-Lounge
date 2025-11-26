// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from './lib/auth';

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // paths to ignore
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/static') || 
    pathname.startsWith('/login') ||
    pathname.startsWith('/register')
  ) {
    return NextResponse.next();
  }

  // read cookie (edge-compatible)
  const access = req.cookies.get('access_token')?.value;
  if (!access) {
    // not logged in
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // verify token signature and expiry
  const payload = await verifyAccessToken(access);
  if (!payload) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // you can add role checks here: if (payload.role !== 'ADMIN' ...)

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
