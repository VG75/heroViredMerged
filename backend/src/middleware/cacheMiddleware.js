import cacheService from '../services/cacheService.js';

// Cache middleware for GET requests
export const cacheMiddleware = (duration = 300) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Generate cache key based on URL and user
        const cacheKey = `cache:${req.originalUrl}:${req.user?.id || 'guest'}`;

        try {
            // Try to get cached data
            const cachedData = await cacheService.get(cacheKey);

            if (cachedData) {
                console.log(`✅ Cache HIT: ${cacheKey}`);
                return res.json(cachedData);
            }

            console.log(`❌ Cache MISS: ${cacheKey}`);

            // Store original json function
            const originalJson = res.json.bind(res);

            // Override json function to cache response
            res.json = (data) => {
                cacheService.set(cacheKey, data, duration);
                return originalJson(data);
            };

            next();
        } catch (error) {
            console.error('Cache middleware error:', error);
            next();
        }
    };
};

// Invalidate cache for specific patterns
export const invalidateCache = async (pattern) => {
    try {
        await cacheService.delPattern(pattern);
        console.log(`🗑️  Invalidated cache: ${pattern}`);
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
};

// Invalidate user-specific cache
export const invalidateUserCache = async (userId) => {
    await invalidateCache(`cache:*:${userId}`);
};

// Invalidate all application caches
export const invalidateAllApplicationCache = async () => {
    await invalidateCache('cache:*/applications*');
};
