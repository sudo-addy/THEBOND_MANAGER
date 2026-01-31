const User = require('../User');

describe('User Model', () => {
    it('should hash password before saving', async () => {
        const user = new User({
            email: 'model@example.com',
            password: 'Password123!',
            name: 'Model User'
        });

        await user.save();

        expect(user.password).not.toEqual('Password123!');
        expect(user.password).toHaveLength(60); // bcrypt hash length
    });

    it('should compare password correctly', async () => {
        const user = new User({
            email: 'compare@example.com',
            password: 'Password123!',
            name: 'Compare User'
        });

        await user.save();

        const isMatch = await user.comparePassword('Password123!');
        expect(isMatch).toBe(true);

        const isNotMatch = await user.comparePassword('WrongPassword');
        expect(isNotMatch).toBe(false);
    });
});
