import { RedisCache } from 'apollo-server-cache-redis';

const toNumber = (value: string | undefined) => parseInt(value || '', 10);

const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: toNumber(process.env.REDIS_PORT) || 6379,
};

let client: RedisCache | undefined = undefined;

const makeCache = () => {
  if (!client) {
    client = new RedisCache(options);
  }

  return client;
};

export { makeCache };
