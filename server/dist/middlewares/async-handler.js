"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wraps an asynchronous route handler function with error handling middleware.
 * @param {Function} fn - The asynchronous route handler function.
 * @returns {Function} - The wrapped route handler function.
 */
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.default = asyncHandler;
