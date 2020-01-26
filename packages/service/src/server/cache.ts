import { RedisCache } from 'apollo-server-cache-redis';

const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

let client: RedisCache | null = null;

const makeCache = () => {
  if (!client) {
    client = new RedisCache(options);
  }

  return client;
};

export { makeCache };
