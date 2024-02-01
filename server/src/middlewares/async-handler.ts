import { NextFunction, Request, Response } from 'express';

/**
 * Wraps an asynchronous route handler function with error handling middleware.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} - The wrapped route handler function.
 */
const asyncHandler = fn => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
