import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as directiveTypeDefs } from './directives';
import { typeDefs as user } from './user';

const typeDefs = mergeTypes([directiveTypeDefs, user].flat(), { all: true });

export { typeDefs };
