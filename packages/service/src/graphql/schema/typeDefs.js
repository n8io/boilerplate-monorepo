import { mergeTypes } from 'merge-graphql-schemas';
import { typeDefs as user } from './user';

const typeDefs = mergeTypes([user].flat(), { all: true });

export { typeDefs };
