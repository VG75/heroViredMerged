import Redis from 'ioredis';

class CacheService {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect(redisUrl) {
        try {
            this.client = new Redis(redisUrl, {
                retryStrategy: (times) => {
                    const delay = Math.min(times * 50, 2000);
                    return delay;
                },
                maxRetriesPerRequest: 3,
            });

            this.client.on('connect', () => {
                console.log('✅ Redis Connected');
                this.isConnected = true;
            });

            this.client.on('error', (err) => {
                console.error('❌ Redis Error:', err.message);
                this.isConnected = false;
            });

            // Test connection
            await this.client.ping();
            return true;
        } catch (error) {
            console.error('Failed to connect to Redis:', error.message);
            return false;
        }
    }

    // Get cached data
    async get(key) {
        if (!this.isConnected) {
            console.warn('Redis not connected, skipping cache get');
            return null;
        }

        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Redis GET error:', error.message);
            return null;
        }
    }

    // Set cache with expiration (in seconds)
    async set(key, value, expirationInSeconds = 3600) {
        if (!this.isConnected) {
            console.warn('Redis not connected, skipping cache set');
            return false;
        }

        try {
            await this.client.setex(key, expirationInSeconds, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Redis SET error:', error.message);
            return false;
        }
    }

    // Delete cached data
    async del(key) {
        if (!this.isConnected) return false;

        try {
            await this.client.del(key);
            return true;
        } catch (error) {
            console.error('Redis DEL error:', error.message);
            return false;
        }
    }

    // Delete multiple keys by pattern
    async delPattern(pattern) {
        if (!this.isConnected) return false;

        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                await this.client.del(...keys);
            }
            return true;
        } catch (error) {
            console.error('Redis DEL PATTERN error:', error.message);
            return false;
        }
    }

    // Clear all cache
    async flushAll() {
        if (!this.isConnected) return false;

        try {
            await this.client.flushall();
            return true;
        } catch (error) {
            console.error('Redis FLUSH error:', error.message);
            return false;
        }
    }

    // Check if key exists
    async exists(key) {
        if (!this.isConnected) return false;

        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Redis EXISTS error:', error.message);
            return false;
        }
    }

    // Close connection
    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.isConnected = false;
        }
    }
}

// Export singleton instance
const cacheService = new CacheService();
export default cacheService;
