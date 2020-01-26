import { resolvers } from '../resolvers';
import { buildSchema } from 'type-graphql';
import { Auth } from 'types/auth';

const makeSchema = async () => {
  const schema = await buildSchema({
    authChecker: Auth.authChecker,
    resolvers,
    validate: false,
  });

  return schema;
};

export { makeSchema };
