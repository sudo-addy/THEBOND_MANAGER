const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { authMiddleware } = require('../middleware/auth');

// POST /api/v1/payments/deposit
// Simulates a bank transfer or UPI payment verification
router.post('/deposit', authMiddleware, async (req, res) => {
    try {
        const { amount, method, txnId } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // 1. Simulate Bank Verification Delay (Make it feel real)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 2. Find User's Portfolio
        let portfolio = await Portfolio.findOne({ user_id: req.user.user_id });

        if (!portfolio) {
            // Create if doesn't exist (rare case but good safety)
            portfolio = new Portfolio({ user_id: req.user.user_id, cash_balance: 0, virtual_balance: 100000 });
        }

        // 3. Credit the "Real" Cash Balance
        portfolio.cash_balance = (portfolio.cash_balance || 0) + Number(amount);

        // Add 'transaction history' logic here if we had a Transaction model
        // For now, we return the updated balance

        await portfolio.save();

        res.json({
            success: true,
            data: {
                new_balance: portfolio.cash_balance,
                txn_id: txnId || `UPI-${Date.now()}`,
                status: 'completed',
                message: `Successfully deposited ₹${amount} via ${method || 'UPI'}`
            }
        });

    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
});

// GET /api/v1/payments/balance
router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user_id: req.user.userId });
        res.json({
            success: true,
            data: {
                cash_balance: portfolio?.cash_balance || 0,
                currency: 'INR'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch balance' });
    }
});

module.exports = router;
