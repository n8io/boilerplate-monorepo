import { RateLimit } from 'types/rateLimit';

const { directive, typeDefs } = RateLimit.make('rateLimitWindow');

export { directive, typeDefs };
