const request = require('supertest');
const { app } = require('../../server');
const User = require('../../models/User');
const Portfolio = require('../../models/Portfolio');
const jwt = require('jsonwebtoken');

describe('Payment Routes', () => {
    let token;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
    });

    describe('POST /api/v1/payments/deposit', () => {
        beforeEach(async () => {
            // Create user and get token
            const user = new User({
                email: 'investor@test.com',
                password: 'Password123!',
                name: 'Test Investor'
            });
            await user.save();
            userId = user._id.toString();

            token = jwt.sign(
                { user_id: userId, role: 'user' },
                process.env.JWT_SECRET || 'fallback_secret',
                { expiresIn: '1h' }
            );

            // Portfolio is created by the route if not exists, so we can skip creation or create one
            await Portfolio.create({
                user_id: userId,
                virtual_balance: 0,
                holdings: []
            });
        });
        it('should deposit funds successfully', async () => {
            const res = await request(app)
                .post('/api/v1/payments/deposit')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    amount: 5000,
                    method: 'upi'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.new_balance).toBe(5000);

            // Verify DB
            const portfolio = await Portfolio.findOne({ user_id: userId });
            expect(portfolio.virtual_balance).toBe(5000);
        });

        it('should validate deposit amount', async () => {
            const res = await request(app)
                .post('/api/v1/payments/deposit')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    amount: -100
                });

            expect(res.statusCode).toBe(400);
        });
    });
});
