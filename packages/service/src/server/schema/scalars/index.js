import { gql } from 'apollo-server-express';
import * as Scalars from 'graphql-scalars';
import { reduce, map } from 'ramda';

const scalarTypes = ['DateTime', 'EmailAddress'];

const resolver = reduce(
  (acc, scalar) => ({
    ...acc,
    [scalar]: Scalars[`${scalar}Resolver`],
  }),
  {},
  scalarTypes
);

const typeDefs = map(
  (scalar) => gql`
  "The ${scalar} scalar type"
  scalar ${scalar}
`,
  scalarTypes
);

export { resolver, typeDefs };
