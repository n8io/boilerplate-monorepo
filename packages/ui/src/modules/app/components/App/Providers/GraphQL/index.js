import { ApolloClient, ApolloProvider } from '@apollo/client';
import { node } from 'prop-types';
import React from 'react';
import { cache } from './cache';
import { link } from './link';

const fetchOptions = {
  credentials: 'include',
};

const client = new ApolloClient({
  cache,
  fetchOptions,
  link,
});

export const GraphQL = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

GraphQL.propTypes = {
  children: node.isRequired,
};
