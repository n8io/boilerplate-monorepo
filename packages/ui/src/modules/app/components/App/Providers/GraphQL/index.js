import { ApolloClient, ApolloProvider } from '@apollo/client';
import { node } from 'prop-types';
import React from 'react';
import { cache } from './cache';
import { link } from './link';

const client = new ApolloClient({
  cache,
  credentials: 'include', // When enabled ('include') we will pass cookies to the server
  link,
});

export const GraphQL = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

GraphQL.propTypes = {
  children: node.isRequired,
};
