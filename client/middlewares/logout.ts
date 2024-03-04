import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const logoutMiddleware = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    if (request.url.includes('/logout')) {
      const response = NextResponse.redirect(new URL('/', request.url), {});
      response.cookies.delete('session');
      return response;
    }
    return next(request, _next);
  };
};

export default logoutMiddleware;
