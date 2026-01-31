const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  holdings: [
    {
      bond_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bond'
      },
      quantity: Number,
      purchase_price: Number,
      current_value: Number,
      gain_loss: Number
    }
  ],
  total_value: {
    type: Number,
    default: 0
  },
  total_invested: {
    type: Number,
    default: 0
  },
  current_gains: {
    type: Number,
    default: 0
  },
  virtual_balance: {
    type: Number,
    default: 1000000 // ₹10L for paper trading
  },
  cash_balance: {
    type: Number,
    default: 0 // Real Money
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
