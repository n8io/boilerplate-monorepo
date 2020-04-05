import { RateLimit } from 'types/rateLimit';

const { directive, typeDefs } = RateLimit.make('rateLimitBurst');

export { directive, typeDefs };
