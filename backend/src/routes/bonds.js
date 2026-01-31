const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Bond = require('../models/Bond');
const redisClient = require('../utils/redisClient');
const { validate } = require('../middleware/validation');
const { createBondValidation, bondQueryValidation } = require('../middleware/validationSchemas');
const { adminMiddleware } = require('../middleware/rbac');

// Get all bonds with filters
/**
 * @route GET /api/v1/bonds
 * @desc Get all bonds with optional filters (risk, maturity) and pagination
 * @access Public
 * @param {string} [risk] - Filter by risk category (e.g., 'low', 'medium', 'high')
 * @param {number} [limit=20] - Number of items per page
 * @param {number} [page=1] - Page number
 * @returns {Object} List of bonds and pagination metadata
 */
router.get('/', validate(bondQueryValidation), async (req, res) => {
  try {
    const { risk, maturity, limit = 20, page = 1 } = req.query;

    // Create a unique cache key based on query params
    const cacheKey = `bonds:list:${JSON.stringify(req.query)}`;

    // Try to fetch from cache (Safe wrapper handles connection state)
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.warn('Cache fetch skipped:', err.message);
    }

    let query = { status: 'active' };

    if (risk) query.risk_category = risk;

    const bonds = await Bond.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 });

    const total = await Bond.countDocuments(query);

    const responseData = {
      success: true,
      data: {
        bonds,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    };

    // Cache the result for 60 seconds
    try {
      await redisClient.setEx(cacheKey, 60, JSON.stringify(responseData));
    } catch (err) {
      console.error('Redis write error:', err);
    }

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get bond by ID
/**
 * @route GET /api/v1/bonds/:id
 * @desc Get detailed information for a specific bond
 * @access Public
 * @param {string} id - Bond ID
 * @returns {Object} Bond details
 */
router.get('/:id', async (req, res) => {
  try {
    const bond = await Bond.findById(req.params.id);
    if (!bond) {
      return res.status(404).json({ error: 'Bond not found' });
    }
    res.json({ success: true, bond });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get AI recommendations for bond
/**
 * @route GET /api/v1/bonds/:id/analytics
 * @desc Get AI-driven analytics and recommendations for a bond
 * @access Public
 * @param {string} id - Bond ID
 * @returns {Object} Analytics data including risk score and market sentiment
 */
router.get('/:id/analytics', async (req, res) => {
  try {
    const bond = await Bond.findById(req.params.id);
    if (!bond) {
      return res.status(404).json({ error: 'Bond not found' });
    }

    // TODO: Replace with real AI service
    res.json({
      success: true,
      analytics: {
        risk_score: Math.floor(Math.random() * 100),
        expected_returns: bond.expected_returns || 7.5,
        recommendation_score: bond.ai_recommendation_score || 8.5,
        market_sentiment: 'bullish'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create bond (admin only)
/**
 * @route POST /api/v1/bonds
 * @desc Create a new bond listing
 * @access Private (Admin only)
 * @body {Object} bondData - Bond details (name, issuer, coupon_rate, etc.)
 * @returns {Object} Created bond object
 */
router.post('/', authMiddleware, adminMiddleware, validate(createBondValidation), async (req, res) => {
  try {
    const bond = new Bond(req.body);
    await bond.save();
    res.status(201).json({ success: true, bond });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
