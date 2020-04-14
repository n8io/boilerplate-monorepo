import { mergeResolvers } from 'merge-graphql-schemas';
import { resolver as scalars } from './scalars';
import { resolver as system } from './system';
import { resolver as user } from './user';

const resolvers = mergeResolvers([scalars, system, user].flat());

export { resolvers };
