const { body, query } = require('express-validator');

/**
 * Validation schemas for authentication routes
 */

const registerValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain uppercase, lowercase, number, and special character'),

    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
];

const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const forgotPasswordValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required')
];

const resetPasswordValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),

    body('otp')
        .isLength({ min: 6, max: 6 })
        .isNumeric()
        .withMessage('OTP must be a 6-digit number'),

    body('newPassword')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain uppercase, lowercase, number, and special character')
];

const sendOtpValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),

    body('purpose')
        .optional()
        .isIn(['password_reset', 'verification', 'login'])
        .withMessage('Invalid OTP purpose')
];

/**
 * Validation schemas for trading routes
 */

const buyBondValidation = [
    body('bond_id')
        .notEmpty()
        .withMessage('Bond ID is required')
        .isMongoId()
        .withMessage('Invalid bond ID format'),

    body('quantity')
        .isInt({ min: 1, max: 10000 })
        .withMessage('Quantity must be between 1 and 10,000'),

    body('price_per_unit')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number')
];

const sellBondValidation = [
    body('bond_id')
        .notEmpty()
        .withMessage('Bond ID is required')
        .isMongoId()
        .withMessage('Invalid bond ID format'),

    body('quantity')
        .isInt({ min: 1, max: 10000 })
        .withMessage('Quantity must be between 1 and 10,000'),

    body('price_per_unit')
        .isFloat({ min: 0.01 })
        .withMessage('Price must be a positive number')
];

/**
 * Validation schemas for bond routes
 */

const createBondValidation = [
    body('bond_id')
        .trim()
        .notEmpty()
        .withMessage('Bond ID is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Bond ID must be between 3 and 20 characters')
        .matches(/^[A-Z0-9-]+$/)
        .withMessage('Bond ID can only contain uppercase letters, numbers, and hyphens'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Bond name is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Bond name must be between 3 and 200 characters'),

    body('issuer')
        .trim()
        .notEmpty()
        .withMessage('Issuer is required'),

    body('maturity_date')
        .isISO8601()
        .withMessage('Valid maturity date is required')
        .custom((value) => {
            if (new Date(value) <= new Date()) {
                throw new Error('Maturity date must be in the future');
            }
            return true;
        }),

    body('coupon_rate')
        .isFloat({ min: 0, max: 100 })
        .withMessage('Coupon rate must be between 0 and 100'),

    body('risk_category')
        .isIn(['low', 'medium', 'high'])
        .withMessage('Risk category must be low, medium, or high'),

    body('par_value')
        .optional()
        .isFloat({ min: 1 })
        .withMessage('Par value must be a positive number'),

    body('units_available')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Units available must be a positive integer')
];

const bondQueryValidation = [
    query('risk')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('Risk filter must be low, medium, or high'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),

    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer')
];

module.exports = {
    registerValidation,
    loginValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    sendOtpValidation,
    buyBondValidation,
    sellBondValidation,
    createBondValidation,
    bondQueryValidation
};
