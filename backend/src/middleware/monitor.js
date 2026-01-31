/**
 * Performance monitoring middleware
 */
const performanceMonitor = (req, res, next) => {
    const startTime = Date.now();
    const startMemory = process.memoryUsage().heapUsed;

    // Override res.json to capture response
    const originalJson = res.json.bind(res);
    res.json = function (data) {
        const duration = Date.now() - startTime;
        const memoryUsed = process.memoryUsage().heapUsed - startMemory;

        // Log performance metrics
        if (duration > 1000) {
            console.warn(`⚠️  Slow request: ${req.method} ${req.path} took ${duration}ms`);
        }

        // Add performance headers
        res.set('X-Response-Time', `${duration}ms`);
        res.set('X-Memory-Used', `${Math.round(memoryUsed / 1024)}KB`);

        return originalJson(data);
    };

    next();
};

/**
 * Request size limiter
 */
const requestSizeLimiter = (maxSize = '10mb') => {
    return (req, res, next) => {
        const contentLength = parseInt(req.headers['content-length'] || 0);
        const maxBytes = parseSize(maxSize);

        if (contentLength > maxBytes) {
            return res.status(413).json({
                error: 'Request entity too large',
                maxSize: maxSize,
                receivedSize: `${Math.round(contentLength / 1024)}KB`
            });
        }

        next();
    };
};

/**
 * Parse size string to bytes
 */
function parseSize(size) {
    const units = { b: 1, kb: 1024, mb: 1024 * 1024, gb: 1024 * 1024 * 1024 };
    const match = size.toLowerCase().match(/^(\d+)([kmg]?b)$/);
    return match ? parseInt(match[1]) * units[match[2]] : 0;
}

module.exports = { performanceMonitor, requestSizeLimiter };
