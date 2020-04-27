import { directives as schemaDirectives } from './directives';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const schema = { resolvers, schemaDirectives, typeDefs };

export { schema };
