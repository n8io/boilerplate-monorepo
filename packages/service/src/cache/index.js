import { RedisCache } from 'apollo-server-cache-redis';
import { config } from 'config';

const { REDIS_KEY_PREFIX, REDIS_URL, isTest } = config;

const make = () => {
  if (isTest) return undefined;

  const uri = new URL(REDIS_URL.replace(/^redis/iu, 'http'));

  uri.protocol = uri.protocol.replace('http', 'redis');

  const options = {
    host: uri.hostname,
    keyPrefix: REDIS_KEY_PREFIX,
    password: uri.password || undefined,
    port: uri.port,
  };

  return new RedisCache(options);
};

const options = REDIS_URL && !isTest ? { url: REDIS_URL } : {};

export { make, options };
