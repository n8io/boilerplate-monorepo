import { RedisCache } from 'apollo-server-cache-redis';

const options = {
  /* eslint-disable no-process-env */
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  /* eslint-enable no-process-env */
};

const make = () => new RedisCache(options);

export { make };
