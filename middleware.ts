import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Cookies from 'js-cookie';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && !['/login', '/register'].includes(request.nextUrl.pathname)) {

    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};