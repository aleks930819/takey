import { authMiddleware, logoutMiddleware, chain } from './middlewares';

const middlewares = chain([authMiddleware, logoutMiddleware]);

export default middlewares;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
