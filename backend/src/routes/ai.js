const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const Bond = require('../models/Bond');

// GET /api/v1/ai/analyze/:bondId
router.get('/analyze/:bondId', async (req, res) => {
    try {
        const { bondId } = req.params;

        // 1. Fetch Bond Details
        // We try to find by MongoDB _id first, then by custom bond_id
        let bond = null;
        try {
            bond = await Bond.findById(bondId);
        } catch (e) { }

        if (!bond) {
            bond = await Bond.findOne({ bond_id: bondId });
        }

        if (!bond) {
            // Fallback for "Paper Trading" symbol simulation if not in DB
            bond = {
                name: bondId,
                expected_returns: 9.5,
                category: 'corporate',
                risk_category: 'medium'
            };
        }

        // 2. Call AI Service
        const analysis = await aiService.analyzeBond(bond);

        res.json({
            success: true,
            data: analysis.data
        });

    } catch (error) {
        console.error('AI Route Error:', error);
        res.status(500).json({ success: false, message: 'AI Analysis Failed' });
    }
});

// Chat with AI
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        const response = await aiService.chat(message);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
