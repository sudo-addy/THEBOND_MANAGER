const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { registerValidation, loginValidation } = require('../middleware/validationSchemas');
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

// Get profile
/**
 * @route GET /api/v1/auth/profile
 * @desc Get current authenticated user's profile
 * @access Private
 * @returns {Object} User profile details
 */
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    res.json({ success: true, user: user.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
