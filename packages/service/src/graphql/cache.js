import { RedisCache } from 'apollo-server-cache-redis';

const options = {
  /* eslint-disable no-process-env */
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  /* eslint-enable no-process-env */
};

let client = null;

const makeCache = () => {
  if (!client) {
    client = new RedisCache(options);
  }

  return client;
};

export { makeCache, options };
