import { RedisCache } from 'apollo-server-cache-redis';
import { config } from 'config';

const { REDIS_URL } = config;

const make = () => new RedisCache(REDIS_URL);

const options = { url: REDIS_URL };

export { make, options };
