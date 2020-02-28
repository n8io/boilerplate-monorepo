import { ApolloLink } from '@apollo/client';
import { stripTypenames } from './utils/stripTypenames';

const stripAllTypenames = new ApolloLink((operation, forward) =>
  forward(operation).map(stripTypenames)
);

export { stripAllTypenames as link };
