import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const logoutMiddleware = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const response = NextResponse.redirect(new URL('/', request.url));
    if (request.url.includes('/logout')) {
      response.cookies.delete('session');
      return response;
    }
    return next(request, _next);
  };
};

export default logoutMiddleware;
