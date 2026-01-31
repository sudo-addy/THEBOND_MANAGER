const { body, query, param, validationResult } = require('express-validator');

/**
 * Validation middleware factory
 * @param {Array} validations - Array of validation chains
 * @returns {Function} Express middleware
 */
const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            error: 'Validation failed',
            details: errors.array().map(err => ({
                field: err.path,
                message: err.msg,
                value: err.value
            }))
        });
    };
};

/**
 * Sanitize request to prevent XSS and injection attacks
 */
const sanitizeInput = (req, res, next) => {
    const sanitize = (obj) => {
        if (!obj || typeof obj !== 'object') return obj;

        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'string') {
                // Remove potential XSS
                obj[key] = obj[key]
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/javascript:/gi, '')
                    .replace(/on\w+\s*=/gi, '');
            } else if (typeof obj[key] === 'object') {
                sanitize(obj[key]);
            }
        });
        return obj;
    };

    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);

    next();
};

module.exports = { validate, sanitizeInput, body, query, param };
