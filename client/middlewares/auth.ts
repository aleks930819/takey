import { isExpired } from '@/actions/auth';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const protectedPaths = ['/account'];

const authMiddleware = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const isExpiredSession = isExpired(request);
    const response = NextResponse.next();

    const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));
    if (isExpiredSession) {
      response.cookies.delete('session');
    }

    if (isExpiredSession && isProtectedPath) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/`);
    }

    return next(request, _next);
  };
};

export default authMiddleware;
