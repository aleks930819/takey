import { NextMiddleware, NextResponse } from 'next/server';

// eslint-disable-next-line no-unused-vars
type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Chains multiple middleware functions together to create a single middleware function.
 * That can be used in a Next.js middleware.
 *
 * @param functions - An array of middleware factory functions.
 * @returns A function that represents the chained middleware.
 */
function chain(functions: MiddlewareFactory[], index = 0): NextMiddleware {
  const current = functions[index];

  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}

export default chain;
