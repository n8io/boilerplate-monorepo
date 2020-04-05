import {
  createRateLimitDirective,
  createRateLimitTypeDef,
} from 'graphql-rate-limit-directive';
import { options } from 'graphql/cache';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';
import { ipKeyGenerator, onLimit } from './selectors';

const storeClient = redis.createClient(options);

const make = name => {
  const directive = createRateLimitDirective({
    keyGenerator: ipKeyGenerator,
    limiterClass: RateLimiterRedis,
    limiterOptions: { storeClient },
    onLimit,
  });

  const typeDefs = createRateLimitTypeDef(name);

  return { directive, typeDefs };
};

export { make };
