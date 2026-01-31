const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { authMiddleware } = require('../middleware/auth');

// POST /api/v1/payments/deposit
// Simulates a bank transfer or UPI payment verification
/**
 * @route POST /api/v1/payments/deposit
 * @desc Deposit funds into the user's wallet (Simulated)
 * @access Private
 * @body {number} amount - Amount to deposit
 * @body {string} [method] - Payment method (e.g., 'UPI', 'NetBanking')
 * @returns {Object} Updated wallet balance and transaction status
 */
router.post('/deposit', authMiddleware, async (req, res) => {
    try {
        const { amount, method, txnId } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // 1. Simulate Bank Verification Delay (Make it feel real)
        if (process.env.NODE_ENV !== 'test') {
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        // 2. Find User's Portfolio
        let portfolio = await Portfolio.findOne({ user_id: req.user.user_id });

        if (!portfolio) {
            // Create if doesn't exist (rare case but good safety)
            portfolio = new Portfolio({ user_id: req.user.user_id, cash_balance: 0, virtual_balance: 0 });
        }

        // 3. Credit the Virtual Balance (used for trading)
        portfolio.virtual_balance = (portfolio.virtual_balance || 0) + Number(amount);
        // Also update cash_balance if we want to track 'real money deposited' separately from 'trading power',
        // but for now let's keep them in sync or just use virtual_balance as the source of truth.
        // Let's update both for backward compatibility if cash_balance was used elsewhere.
        portfolio.cash_balance = (portfolio.cash_balance || 0) + Number(amount);

        // Add 'transaction history' logic here if we had a Transaction model
        // For now, we return the updated balance

        const emailService = require('../services/emailService');
        const User = require('../models/User');

        // ...

        await portfolio.save();

        // Send Deposit Confirmation (async)
        const fullUser = await User.findById(req.user.user_id);
        if (fullUser) {
            emailService.sendDepositConfirmation(fullUser, amount, portfolio.virtual_balance)
                .catch(err => console.error('Failed to send deposit email:', err));
        }

        res.json({
            success: true,
            data: {
                new_balance: portfolio.virtual_balance,
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
/**
 * @route GET /api/v1/payments/balance
 * @desc Get current wallet balance
 * @access Private
 * @returns {Object} Cash and Virtual balance
 */
router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user_id: req.user.user_id });
        res.json({
            success: true,
            data: {
                cash_balance: portfolio?.virtual_balance || 0, // Return virtual balance as the display balance
                currency: 'INR'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch balance' });
    }
});

module.exports = router;
