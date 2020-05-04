import { RateLimitDirective } from 'types/rateLimitDirective';
import { RateLimiterKeyGenerator } from 'types/rateLimiterKeyGenerator';

const { directive, typeDefs } = RateLimitDirective.make(
  'rateLimitWindow',
  RateLimiterKeyGenerator.IP
);

export { directive, typeDefs };
