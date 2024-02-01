/**
 * Restricts access to certain routes based on user roles.
 * @param {...string[]} roles - The roles allowed to access the route.
 * @returns {Function} - The middleware function.
 */
declare const restrictTo: (...roles: string[]) => (req: any, res: any, next: any) => any;
export default restrictTo;
