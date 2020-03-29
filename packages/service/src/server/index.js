import { ApolloServer } from 'apollo-server-express';
import { context } from './context';
import { formatError } from './formatError';

const make = (app, cache, schema) => {
  const server = new ApolloServer({
    cache,
    context,
    // debug is enabled on purpose to have more verbose logging in Apollo
    // Graphql Monitor. DO NOT CHANGE!!!
    debug: true,
    formatError,
    ...schema,
  });

  server.applyMiddleware({ app, cors: false });

  return server;
};

export { make };
