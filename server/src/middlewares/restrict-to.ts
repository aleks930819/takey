import { RESPONSE_STATUS } from '../constants';

type Roles = 'user' | 'admin' | 'super-admin';

/**
 * Restricts access to certain routes based on user roles.
 * @param {...string[]} roles - The roles allowed to access the route.
 * @returns {Function} - The middleware function.
 */
const restrictTo = (...roles: Roles[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: RESPONSE_STATUS.FAIL,
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

export default restrictTo;
