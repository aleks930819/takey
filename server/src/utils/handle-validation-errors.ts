import { validationResult } from 'express-validator';

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that handles validation errors from the express-validator package.
 * @param req -  Express request object.
 * @param res - Express response object.
 * @param next - Express next function to call.
 */
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: errors.array()[0].msg
    });
  }
  next();
};

export default handleValidationErrors;
