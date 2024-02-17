import { authMiddleware, logoutMiddleware, chain } from './middlewares';

const middlewares = chain([logoutMiddleware, authMiddleware]);

export default middlewares;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
