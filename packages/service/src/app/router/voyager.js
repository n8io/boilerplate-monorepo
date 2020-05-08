import { express as voyagerMiddleware } from 'graphql-voyager/middleware';

const middleware = voyagerMiddleware({ endpointUrl: '/graphql' });

export { middleware as voyager };
