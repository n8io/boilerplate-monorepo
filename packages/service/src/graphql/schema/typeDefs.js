import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as directiveTypeDefs } from './directives';
import { typeDefs as scalars } from './scalars';
import { typeDefs as system } from './system';
import { typeDefs as user } from './user';

const typeDefs = mergeTypes([directiveTypeDefs, scalars, system, user].flat(), {
  all: true,
});

export { typeDefs };
