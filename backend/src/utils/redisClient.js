const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        connectTimeout: 5000,
        reconnectStrategy: retries => {
            if (retries > 5) {
                console.log('Skipping Redis connection after 5 retries. Running in fallback mode.');
                return new Error('Redis connection retries exhausted');
            }
            return Math.min(retries * 50, 500);
        }
    }
});

let isRedisReady = false;

redisClient.on('error', (err) => {
    // console.error('Redis Client Error', err.message); // Suppress spam logs
    isRedisReady = false;
});

redisClient.on('connect', () => {
    console.log('✓ Redis Client Connected');
    isRedisReady = true;
});

// Attempt connection but don't block
(async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.log('⚠️ Redis Connection Failed. Running without cache.');
    }
})();

module.exports = {
    get: async (key) => isRedisReady ? redisClient.get(key) : null,
    setEx: async (key, ttl, value) => isRedisReady ? redisClient.setEx(key, ttl, value) : null,
    isReady: () => isRedisReady
};
