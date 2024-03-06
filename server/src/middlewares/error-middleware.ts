/**
 * Middleware function to handle 404 Not Found errors.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Express error handling middleware.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const errorHandler = (err, req, res) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;


  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue);
    message = `Duplicate field value entered for ${field}, please enter another value`;
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const errorMiddleware = {
  notFound,
  errorHandler,
};

export default errorMiddleware;
