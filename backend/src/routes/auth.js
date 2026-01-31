const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  sendOtpValidation
} = require('../middleware/validationSchemas');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

const emailService = require('../services/emailService');

// Register
/**
 * @route POST /api/v1/auth/register
// ... (existing JSDoc)
 */
router.post('/register', validate(registerValidation), async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // ... (existing user creation logic) ...
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const user = new User({ email, password, name });
    await user.save();

    // Create portfolio
    await Portfolio.create({ user_id: user._id });

    // Send Welcome Email (async, don't block response)
    emailService.sendWelcomeEmail(user).catch(err => console.error('Failed to send welcome email:', err));

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: user.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
/**
 * @route POST /api/v1/auth/login
 * @desc Authenticate user and get access token
 * @access Public
 * @body {string} email - User email
 * @body {string} password - User password
 * @returns {Object} Access token and user details
 */
router.post('/login', validate(loginValidation), async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User not found for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    let isValid = false;
    try {
      isValid = await user.comparePassword(password);
      console.log(`Login attempt for ${email}: Password valid? ${isValid}`);
    } catch (pwErr) {
      console.error('Password comparison error:', pwErr);
      return res.status(500).json({ error: 'Authentication failed' });
    }

    if (!isValid) {
      console.log(`Login failed: Invalid password for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('CRITICAL: JWT_SECRET not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const accessToken = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || '1h'
    });

    res.json({
      success: true,
      message: 'Login successful',
      tokens: { access_token: accessToken },
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login route error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
});

// OTP Storage (In-memory - For production, use Redis)
const otpStore = new Map(); // { email: { otp, expires, purpose } }

// Send OTP
/**
 * @route POST /api/v1/auth/send-otp
 * @desc Generate and send OTP to user's email
 * @access Public
 * @body {string} email - User email
 * @body {string} purpose - OTP purpose (password_reset, verification, login)
 * @returns {Object} Success message
 */
router.post('/send-otp', validate(sendOtpValidation), async (req, res) => {
  try {
    const { email, purpose = 'verification' } = req.body;

    // Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with 10 minutes expiry
    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      purpose
    });

    // Send OTP via email
    await emailService.sendOtpEmail(email, otp, purpose);

    res.json({
      success: true,
      message: 'OTP sent successfully to your email',
      expiresIn: 600 // seconds
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Forgot Password (Initiate Reset)
/**
 * @route POST /api/v1/auth/forgot-password
 * @desc Initiate password reset by sending OTP
 * @access Public
 * @body {string} email - User email
 * @returns {Object} Success message
 */
router.post('/forgot-password', validate(forgotPasswordValidation), async (req, res) => {
  try {
    const { email } = req.body;

    // Verify user exists
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not (security best practice)
      return res.json({
        success: true,
        message: 'If an account exists with this email, you will receive a password reset code'
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with 10 minutes expiry
    otpStore.set(email, {
      otp,
      expires: Date.now() + 10 * 60 * 1000,
      purpose: 'password_reset'
    });

    // Send OTP via email
    await emailService.sendOtpEmail(email, otp, 'password_reset');

    res.json({
      success: true,
      message: 'If an account exists with this email, you will receive a password reset code'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process password reset request' });
  }
});

// Reset Password
/**
 * @route POST /api/v1/auth/reset-password
 * @desc Reset password using OTP
 * @access Public
 * @body {string} email - User email
 * @body {string} otp - 6-digit OTP code
 * @body {string} newPassword - New password
 * @returns {Object} Success message
 */
router.post('/reset-password', validate(resetPasswordValidation), async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Verify OTP exists and is not expired
    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    if (storedOtp.expires < Date.now()) {
      otpStore.delete(email);
      return res.status(400).json({ error: 'OTP has expired' });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (storedOtp.purpose !== 'password_reset') {
      return res.status(400).json({ error: 'Invalid OTP purpose' });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    // Clear OTP after successful reset
    otpStore.delete(email);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Cleanup expired OTPs every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (data.expires < now) {
      otpStore.delete(email);
    }
  }
}, 15 * 60 * 1000);

module.exports = router;
