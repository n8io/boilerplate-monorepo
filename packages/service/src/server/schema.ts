import { resolvers } from '../resolvers';
import { buildSchema } from 'type-graphql';
import { Auth } from 'types/auth';
import { GraphQLSchema } from 'graphql';

let schema: GraphQLSchema | undefined = undefined;

const makeSchema = async () => {
  if (schema) return schema;

  schema = await buildSchema({
    authChecker: Auth.authChecker,
    resolvers,
    validate: false,
  });

  return schema;
};

export { makeSchema };
