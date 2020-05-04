import { RateLimitDirective } from 'types/rateLimitDirective';
import { RateLimiterKeyGenerator } from 'types/rateLimiterKeyGenerator';

const { directive, typeDefs } = RateLimitDirective.make(
  'rateLimitUsername',
  RateLimiterKeyGenerator.USERNAME
);

export { directive, typeDefs };
