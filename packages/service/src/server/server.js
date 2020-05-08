import { ApolloServer } from 'apollo-server-express';
import { make as makeContext } from './context';
import { formatError } from './formatError';
import { resolvers, schemaDirectives, typeDefs } from './schema';

const make = ({ cache, context } = {}) =>
  new ApolloServer({
    cache,
    context: context || makeContext(),
    // debug is enabled on purpose to have more verbose logging in Apollo
    // Graphql Monitor. DO NOT CHANGE!!!
    debug: true,
    formatError,
    resolvers,
    schemaDirectives,
    typeDefs,
  });

export { make };
