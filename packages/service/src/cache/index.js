import { RedisCache } from 'apollo-server-cache-redis';
import { config } from 'config';

const { REDIS_URL, isTest } = config;

const make = () => (isTest ? undefined : new RedisCache(REDIS_URL));

const options = REDIS_URL && !isTest ? { url: REDIS_URL } : {};

export { make, options };
