/**
 * Environment variable validator
 * Ensures critical environment variables are set before server starts
 */
const validateEnv = () => {
    const required = [
        'JWT_SECRET',
        'MONGODB_URI'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.error('❌ CRITICAL: Missing required environment variables:');
        missing.forEach(key => console.error(`   - ${key}`));
        console.error('\nPlease set these variables in your .env file or environment.');
        process.exit(1);
    }

    // Validate JWT_SECRET strength
    if (process.env.JWT_SECRET.length < 32) {
        console.error('❌ CRITICAL: JWT_SECRET must be at least 32 characters long');
        process.exit(1);
    }

    console.log('✓ Environment variables validated');
};

module.exports = { validateEnv };
