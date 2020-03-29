import { directives as schemaDirectives } from './directives';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const make = () => ({ resolvers, schemaDirectives, typeDefs });

export { make };
