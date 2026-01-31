module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/server.js', // Exclude entry point
        '!src/utils/redisClient.js' // Exclude redis connection
    ],
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFilesAfterEnv: ['./tests/setup.js']
};
