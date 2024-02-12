import { isExpired } from './actions/auth/index';
import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/account'];

export async function middleware(request: NextRequest) {
  const isExpiredSession = isExpired(request);

  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

  if (isExpiredSession && isProtectedPath) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/`);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
