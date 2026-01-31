/**
 * Role-Based Access Control (RBAC) Middleware
 */

/**
 * Middleware to check if user has admin role
 */
const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            error: 'Access denied',
            message: 'Admin privileges required'
        });
    }

    next();
};

/**
 * Middleware to check if user is verified (KYC completed)
 */
const verifiedUserMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.kyc_status !== 'verified') {
        return res.status(403).json({
            error: 'KYC verification required',
            message: 'Please complete KYC verification to access this feature'
        });
    }

    next();
};

/**
 * Middleware factory to check for specific roles
 * @param {Array<string>} allowedRoles - Array of allowed roles
 */
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Access denied',
                message: `Required role: ${allowedRoles.join(' or ')}`
            });
        }

        next();
    };
};

module.exports = {
    adminMiddleware,
    verifiedUserMiddleware,
    requireRole
};
