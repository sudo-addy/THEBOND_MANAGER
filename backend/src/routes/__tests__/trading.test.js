const request = require('supertest');
const { app } = require('../../server');
const User = require('../../models/User');
const Bond = require('../../models/Bond');
const Portfolio = require('../../models/Portfolio');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

describe('Trading Routes', () => {
    let token;
    let userId;
    let bondId;

    beforeAll(() => {
        // No mock needed for session as code skips it in test mode
    });

    beforeEach(async () => {
        // Clear data before each test to ensure isolation
        await User.deleteMany({});
        await Bond.deleteMany({});
        await Portfolio.deleteMany({});

        // Setup User
        const user = new User({
            email: 'trader@test.com',
            password: 'Password123!',
            name: 'Test Trader'
        });
        await user.save();
        userId = user._id.toString();

        token = jwt.sign(
            { user_id: userId, role: 'user' },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1h' }
        );

        // Setup Bond
        const bond = await Bond.create({
            bond_id: 'TRADETEST01',
            name: 'Trading Test Bond',
            issuer: 'Test Corp',
            coupon_rate: 5.5,
            maturity_date: new Date('2030-01-01'),
            risk_category: 'low',
            credit_rating: 'AAA',
            expected_returns: 5.5,
            units_available: 1000,
            status: 'active',
            price: 1000
        });
        bondId = bond._id.toString();

        // Setup Portfolio with funds
        await Portfolio.create({
            user_id: userId,
            virtual_balance: 10000,
            holdings: []
        });
    });

    afterAll(async () => {
        // Cleanup
        await User.deleteMany({});
        await Bond.deleteMany({});
        await Portfolio.deleteMany({});
    });

    describe('POST /api/v1/trading/buy', () => {
        it('should buy bond successfully', async () => {
            const res = await request(app)
                .post('/api/v1/trading/buy')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    bond_id: bondId,
                    quantity: 5,
                    price_per_unit: 1000
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.transaction).toBeDefined();

            // Verify Balances
            const portfolio = await Portfolio.findOne({ user_id: userId });
            expect(portfolio.virtual_balance).toBe(5000); // 10000 - (5 * 1000)
            expect(portfolio.holdings[0].quantity).toBe(5);
        });

        it('should fail with insufficient funds', async () => {
            const res = await request(app)
                .post('/api/v1/trading/buy')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    bond_id: bondId,
                    quantity: 100, // Cost 100,000 > Balance 5000
                    price_per_unit: 1000
                });

            expect(res.statusCode).toBe(400); // Or 500 depending on error handler
        });
    });
});
