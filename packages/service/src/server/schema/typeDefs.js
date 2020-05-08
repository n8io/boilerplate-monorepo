import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as directives } from './directives';
import { typeDefs as scalars } from './scalars';
import { typeDefs as system } from './system';
import { typeDefs as user } from './user';
import { typeDefs as users } from './users';

const typeDefs = mergeTypes([directives, scalars, system, user, users].flat(), {
  all: true,
});

export { typeDefs };
