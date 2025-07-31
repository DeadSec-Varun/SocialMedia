import IORedis from 'ioredis';

let redis;

if (!global.redisClient) {
  redis = new IORedis({
    host: 'redis',
    port: 6379,
    maxRetriesPerRequest: null, // 🔥 this is REQUIRED by BullMQ
    retryStrategy: (times) => {
      if (times > 5) return null; // Stop reconnecting after 5 tries
      return 1000; // retry after 1 sec
    }
  });

  redis.on('error', (err) => console.error('Redis Client Error:', err));
  redis.on('connect', () => console.log('✅ Redis connected'));

  global.redisClient = redis;
} else {
  redis = global.redisClient;
}

export {redis};
