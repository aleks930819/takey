"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Restricts access to certain routes based on user roles.
 * @param {...string[]} roles - The roles allowed to access the route.
 * @returns {Function} - The middleware function.
 */
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};
exports.default = restrictTo;
