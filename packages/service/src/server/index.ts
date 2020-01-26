import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { middleware as context } from 'types/context';
import { makeCache } from './cache';
import { makeSchema } from './schema';
import { formatError } from './formatError';

const makeServer = async (app: Express) => {
  const cache = makeCache();
  const schema = await makeSchema();
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
