import { ApolloServer } from 'apollo-server-express';
import { resolvers } from 'resolvers';
import { buildSchema } from 'type-graphql';
import { Context } from 'types/context';

const makeServer = async (app: any) => {
  const context = ({ req, res }: Context) => ({
    req,
    res,
  });

  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({
    context,
    schema,
  });

  server.applyMiddleware({ app });
};

export { makeServer };
