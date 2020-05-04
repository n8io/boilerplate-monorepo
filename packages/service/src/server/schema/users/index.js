import * as Users from './users';

const resolver = {
  Query: {
    users: Users.resolver,
  },
};

const typeDefs = [Users.typeDefs];

export { resolver, typeDefs };
