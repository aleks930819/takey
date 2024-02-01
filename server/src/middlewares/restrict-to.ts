/**
 * Restricts access to certain routes based on user roles.
 * @param {...string[]} roles - The roles allowed to access the route.
 * @returns {Function} - The middleware function.
 */
const restrictTo = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

export default restrictTo;
