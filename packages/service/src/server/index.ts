import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { middleware as context } from 'types/context';
import { formatError } from './formatError';
import { GraphQLSchema } from 'graphql';
import { RedisCache } from 'apollo-server-cache-redis';

const makeServer = async (
  app: Express,
  schema: GraphQLSchema,
  cache: RedisCache
) => {
  const server = new ApolloServer({
    cache,
    context,
    // debug is enabled on purpose to have more verbose logging in Graphql Monitor
    // DO NOT CHANGE!!!
    debug: true,
    formatError,
    schema,
  });

  server.applyMiddleware({ app, cors: false });

  return server;
};

export { makeServer };
