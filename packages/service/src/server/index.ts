import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { resolvers } from 'resolvers';
import { buildSchema } from 'type-graphql';
import { Auth } from 'types/auth';
import { middleware as context } from 'types/context';
import { formatError } from './formatError';

const makeServer = async (app: Express) => {
  const schema = await buildSchema({
    authChecker: Auth.authChecker,
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({
    context,
    // debug is enabled on purpose to have more verbose logging in Graphql Monitor
    debug: true,
    // engine: {
    //   rewriteError(err) {
    //     console.log(err);
    //     return err;
    //   },
    // },
    formatError,
    schema,
  });

  server.applyMiddleware({ app, cors: false });

  return server;
};

export { makeServer };
