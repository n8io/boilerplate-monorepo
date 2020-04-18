import {
  createRateLimitDirective,
  createRateLimitTypeDef,
} from 'graphql-rate-limit-directive';
import { options } from 'graphql/cache';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import { RateLimiterKeyGenerator } from 'types/rateLimiterKeyGenerator';
import { onLimit } from './selectors';

const storeClient = redis.createClient(options);

const make = (name, keyGenerator = RateLimiterKeyGenerator.IP) => {
  const directive = createRateLimitDirective({
    keyGenerator,
    limiterClass: RateLimiterRedis,
    limiterOptions: { storeClient },
    onLimit,
  });

  const typeDefs = createRateLimitTypeDef(name);

  return { directive, typeDefs };
};

export { make };
