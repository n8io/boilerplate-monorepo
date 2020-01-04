import { ApolloServer } from 'apollo-server-express';
import { resolvers } from 'resolvers';
import { buildSchema } from 'type-graphql';
import { Auth } from 'types/auth';
import { contextMiddleware } from 'types/context';

const makeServer = async (app: any) => {
  const schema = await buildSchema({
    authChecker: Auth.authChecker,
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({
    context: contextMiddleware,
    schema,
  });

  server.applyMiddleware({ app });
};

export { makeServer };
