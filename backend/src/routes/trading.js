const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const Bond = require('../models/Bond');
const { v4: uuidv4 } = require('uuid');

const { validate } = require('../middleware/validation');
const { buyBondValidation } = require('../middleware/validationSchemas');

// Buy bond
const mongoose = require('mongoose');

// Buy bond
// Buy bond
/**
 * @route POST /api/v1/trading/buy
 * @desc Purchase a bond using wallet balance
 * @access Private
 * @body {string} bond_id - ID of the bond to purchase
 * @body {number} quantity - Number of units to buy
 * @body {number} price_per_unit - Price per unit at time of order
 * @returns {Object} Transaction details and updated balance
 */
router.post('/buy', authMiddleware, validate(buyBondValidation), async (req, res, next) => {
  // Transaction support only with Replica Set (skip in tests)
  const useTransaction = process.env.NODE_ENV !== 'test';
  let session = null;
  if (useTransaction) {
    session = await mongoose.startSession();
    session.startTransaction();
  }

  try {
    const { bond_id, quantity, price_per_unit } = req.body;

    // 1. Fetch Bond
    // If session is null, .session(null) is safe (ignores it)
    const bond = await Bond.findById(bond_id).session(session);

    if (!bond) {
      throw new Error('Bond not found');
    }

    if (bond.status !== 'active') {
      throw new Error('Bond is not active for trading');
    }

    if (bond.units_available < quantity) {
      throw new Error(`Insufficient bond units. Only ${bond.units_available} available.`);
    }

    const total_amount = quantity * price_per_unit;

    // 2. Fetch or Create Portfolio
    let portfolio = await Portfolio.findOne({ user_id: req.user.user_id }).session(session);
    if (!portfolio) {
      // Need to handle creation manually if no session? array wrap is for transaction create normally
      if (useTransaction) {
        portfolio = await Portfolio.create([{ user_id: req.user.user_id }], { session });
        portfolio = portfolio[0];
      } else {
        portfolio = await Portfolio.create({ user_id: req.user.user_id });
      }
    }

    // 3. Check Balance
    if (portfolio.virtual_balance < total_amount) {
      throw new Error(`Insufficient funds. Balance: ${portfolio.virtual_balance}, Required: ${total_amount}`);
    }

    // 4. Create Transaction
    const transaction = new Transaction({
      transaction_id: `TXN-${uuidv4()}`,
      user_id: req.user.user_id,
      bond_id,
      type: 'buy',
      quantity,
      price_per_unit,
      total_amount,
      payment_method: 'wallet',
      payment_status: 'completed',
      status: 'confirmed'
    });

    await transaction.save({ session });

    // 5. Update Portfolio Holdings
    const existingHoldingIndex = portfolio.holdings.findIndex(h => h.bond_id.toString() === bond_id);

    if (existingHoldingIndex >= 0) {
      portfolio.holdings[existingHoldingIndex].quantity += quantity;
      // Weighted average price could be implemented here
    } else {
      portfolio.holdings.push({ bond_id, quantity, purchase_price: price_per_unit });
    }

    portfolio.total_invested = (portfolio.total_invested || 0) + total_amount;
    portfolio.virtual_balance -= total_amount;
    await portfolio.save({ session });

    const emailService = require('../services/emailService');

    // ...

    // 6. Update Bond Inventory
    bond.units_available -= quantity;
    bond.units_sold += quantity;
    await bond.save({ session });

    if (useTransaction && session) {
      await session.commitTransaction();
    }

    // Send Trade Confirmation Email (async)
    // Need to fetch user details for name/email if not in req.user
    // But authMiddleware usually only provides id/role. Let's fetch pure user object or rely on what we have.
    // Ideally, we should fetch the user or trust auth middleware to populate it if modified.
    // For now, let's fetch it quickly or assume req.user is hydrated enough if changed.
    // Actually, req.user from auth middleware only has { user_id, role }.
    // We need to fetch the full user for the email address.
    const fullUser = await require('../models/User').findById(req.user.user_id);
    if (fullUser) {
      emailService.sendTradeConfirmation(fullUser, transaction, bond).catch(err => console.error('Failed to send trade email:', err));
    }

    res.status(201).json({
      success: true,
      message: 'Bond purchase successful',
      transaction,
      new_balance: portfolio.virtual_balance
    });

  } catch (error) {
    if (useTransaction && session) {
      await session.abortTransaction();
    }
    // Pass custom errors with 400 status if distinct
    if (error.message.includes('Insufficient') || error.message.includes('Bond not')) {
      return res.status(400).json({ success: false, error: error.message });
    }
    next(error);
  } finally {
    if (useTransaction && session) {
      session.endSession();
    }
  }
});

// Get trades
/**
 * @route GET /api/v1/trading
 * @desc Get trading history for the authenticated user
 * @access Private
 * @returns {Array} List of past transactions
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trades = await Transaction.find({ user_id: req.user.user_id })
      .populate('bond_id')
      .sort({ timestamp: -1 });

    res.json({ success: true, trades });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
