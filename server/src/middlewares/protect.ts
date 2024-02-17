import { NextFunction, Response, Request } from 'express';
// import * as jwt from 'jsonwebtoken';

import { RESPONSE_STATUS } from '../constants';
import { User } from '../models';
import { asnycHandler } from '.';
import { verifyToken } from '../utils/token';
// import { tokenService } from '../services';

const protect = asnycHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Unauthorized',
    });
  }

  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Unauthorized',
    });
  }

  // const decodedToken = await tokenService.veirfyToken(token, 'access');

  // console.log('decodedToken', decodedToken);

  const decoded = (await verifyToken(token)) as { _id: string; iat: number; exp: number };

  const user = await User.findById(decoded._id);
  // const user = await User.findById(decodedToken.user);

  if (!user) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Unauthorized',
    });
  }

  if (user.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: RESPONSE_STATUS.FAIL,
      message: 'Unauthorized',
    });
  }

  // Grant access to protected route
  // Add user to req object
  // because we will need it in the next middleware (restrictTo)!!!
  req.user = {
    role: user.role,
    _id: user._id.toString(),
  };

  next();
});

export default protect;
