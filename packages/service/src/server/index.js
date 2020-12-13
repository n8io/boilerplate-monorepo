import { config } from 'config';
import http from 'http';
import https from 'https';
import { make as makeContext } from './context';
import { formatError } from './formatError';
import { make as makeHttpsOptions } from './httpsOptions';
import { resolvers, schemaDirectives, typeDefs } from './schema';

const { HTTPS: isHttps } = config;

const makeServer = (ApolloServer) => ({ cache, context } = {}) =>
  new ApolloServer({
    cache,
    context: context || makeContext(),
    // debug is enabled on purpose to have more verbose logging in Apollo
    // Graphql Monitor. DO NOT CHANGE!!!
    debug: true,
    formatError,
    resolvers,
    schemaDirectives,
    typeDefs,
  });

const make = (ApolloServer) => async ({ app, cache }) => {
  const apolloServer = makeServer(ApolloServer)({ cache });

  apolloServer.applyMiddleware({ app, cors: false });

  let server = null;

  if (isHttps) {
    const options = await makeHttpsOptions();

    server = https.createServer(options, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};

export { make, makeServer };
