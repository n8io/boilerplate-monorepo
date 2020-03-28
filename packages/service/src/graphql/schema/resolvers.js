import { mergeResolvers } from 'merge-graphql-schemas';
import { resolver as user } from './user';

const resolvers = mergeResolvers([user].flat());

export { resolvers };
