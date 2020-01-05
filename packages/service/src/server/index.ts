import { ApolloServer } from 'apollo-server-express';
import { resolvers } from 'resolvers';
import { buildSchema } from 'type-graphql';
import { Auth } from 'types/auth';
import { contextMiddleware as context } from 'types/context';
import { formatError } from './formatError';

const makeServer = async (app: any) => {
  const schema = await buildSchema({
    authChecker: Auth.authChecker,
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({
    context,
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

  server.applyMiddleware({ app });
};

export { makeServer };
