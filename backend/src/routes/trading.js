const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Transaction = require('../models/Transaction');
const Portfolio = require('../models/Portfolio');
const Bond = require('../models/Bond');
const { v4: uuidv4 } = require('uuid');

// Buy bond
router.post('/buy', authMiddleware, async (req, res) => {
  try {
    const { bond_id, quantity, price_per_unit } = req.body;

    const bond = await Bond.findById(bond_id);
    if (!bond) {
      return res.status(404).json({ error: 'Bond not found' });
    }

    const total_amount = quantity * price_per_unit;

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

    await transaction.save();

    // Update portfolio
    let portfolio = await Portfolio.findOne({ user_id: req.user.user_id });
    if (!portfolio) {
      portfolio = await Portfolio.create({ user_id: req.user.user_id });
    }

    const existingHolding = portfolio.holdings.find(h => h.bond_id.toString() === bond_id);
    if (existingHolding) {
      existingHolding.quantity += quantity;
    } else {
      portfolio.holdings.push({ bond_id, quantity, purchase_price: price_per_unit });
    }

    portfolio.total_invested = (portfolio.total_invested || 0) + total_amount;
    portfolio.virtual_balance = (portfolio.virtual_balance || 1000000) - total_amount;
    await portfolio.save();

    res.status(201).json({
      success: true,
      message: 'Bond purchase successful',
      transaction
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get trades
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
