import * as SystemTime from './time';

const resolver = {
  Query: {
    systemTime: SystemTime.resolver,
  },
};

const typeDefs = [SystemTime.typeDefs];

export { resolver, typeDefs };
