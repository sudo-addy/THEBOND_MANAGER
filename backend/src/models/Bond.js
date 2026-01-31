const mongoose = require('mongoose');

const bondSchema = new mongoose.Schema({
  bond_id: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  issuer: {
    type: String,
    required: true
  },
  issue_date: Date,
  maturity_date: {
    type: Date,
    required: true
  },
  par_value: {
    type: Number,
    default: 100
  },
  coupon_rate: {
    type: Number,
    required: true
  },
  coupon_frequency: {
    type: String,
    enum: ['annual', 'semi-annual', 'quarterly'],
    default: 'annual'
  },
  current_price: {
    type: Number,
    default: 100
  },
  risk_category: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  credit_rating: String,
  expected_returns: Number,
  units_available: {
    type: Number,
    default: 10000
  },
  units_sold: {
    type: Number,
    default: 0
  },
  project_details: String,
  sector: String,
  status: {
    type: String,
    enum: ['active', 'inactive', 'matured', 'delisted'],
    default: 'active'
  },
  ai_recommendation_score: {
    type: Number,
    min: 0,
    max: 10
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

// Compound indexes for optimized filtering
bondSchema.index({ status: 1, created_at: -1 }); // Default homepage query
bondSchema.index({ status: 1, risk_category: 1 }); // Risk filter query
bondSchema.index({ bond_id: 1 }, { unique: true }); // Search by ID
bondSchema.index({ name: 'text', issuer: 'text' }); // Text search capability

module.exports = mongoose.model('Bond', bondSchema);
