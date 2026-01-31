const request = require('supertest');
const { app } = require('../../server');
const User = require('../../models/User');

describe('Auth Routes', () => {
    describe('POST /api/v1/auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Password123!',
                    name: 'Test User'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email', 'test@example.com');
        });

        it('should not register user with existing email', async () => {
            await User.create({
                email: 'test@example.com',
                password: 'Password123!',
                name: 'Existing User'
            });

            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'Password123!',
                    name: 'Test User'
                });

            expect(res.statusCode).toEqual(409);
        });

        it('should not register user with weak password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'weak@example.com',
                    password: '123',
                    name: 'Weak Password User'
                });

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            await request(app)
                .post('/api/v1/auth/register')
                .send({
                    email: 'login@example.com',
                    password: 'Password123!',
                    name: 'Login User'
                });
        });

        it('should login with correct credentials', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'Password123!'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('tokens');
            expect(res.body.tokens).toHaveProperty('access_token');
        });

        it('should not login with incorrect password', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'login@example.com',
                    password: 'WrongPassword123!'
                });

            expect(res.statusCode).toEqual(401);
        });
    });
});
