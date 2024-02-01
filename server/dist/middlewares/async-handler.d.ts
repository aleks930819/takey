import { NextFunction, Request, Response } from 'express';
/**
 * Wraps an asynchronous route handler function with error handling middleware.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} - The wrapped route handler function.
 */
declare const asyncHandler: (fn: any) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
export default asyncHandler;
