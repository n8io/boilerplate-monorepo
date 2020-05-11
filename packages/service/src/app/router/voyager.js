import { config } from 'config';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const passThrough = (_req, _res, next) => next();

const middleware = config.isDev
  ? voyagerMiddleware({ endpointUrl: '/graphql' })
  : passThrough;

export { middleware as voyager };
