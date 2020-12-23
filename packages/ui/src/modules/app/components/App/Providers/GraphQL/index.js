import { ApolloClient, ApolloProvider } from '@apollo/client';
import { config } from 'config';
import { node } from 'prop-types';
import React from 'react';
import { cache } from './cache';
import { link } from './link';

const fetchOptions = {
  credentials: 'same-origin',
};

const client = new ApolloClient({
  cache,
  fetchOptions,
  link,
  name: 'web',
  version: config.RELEASE,
});

export const GraphQL = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

GraphQL.propTypes = {
  children: node.isRequired,
};
