import { options } from 'cache';
import { config } from 'config';
import {
  createRateLimitDirective,
  createRateLimitTypeDef,
} from 'graphql-rate-limit-directive';
import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
import redis from 'redis';
import { RateLimiterKeyGenerator } from 'types/rateLimiterKeyGenerator';
import { onLimit } from './selectors';

const { isTest } = config;

const limiterClass = isTest ? RateLimiterMemory : RateLimiterRedis;

const limiterOptions = isTest
  ? undefined
  : { storeClient: redis.createClient(options) };

const make = (name, keyGenerator = RateLimiterKeyGenerator.IP) => {
  const directive = createRateLimitDirective({
    keyGenerator,
    limiterClass,
    limiterOptions,
    onLimit,
  });

  const typeDefs = createRateLimitTypeDef(name);

  return { directive, typeDefs };
};

export { make };
