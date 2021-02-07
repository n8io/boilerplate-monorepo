import { HttpLink } from '@apollo/client';
import { config } from 'config';

const appendOperationName = (href, operationName) =>
  `${href}?___${operationName}`;

const makeGraphQLUri = () => ({ operationName }) => {
  if (config.GRAPHQL_URI)
    return appendOperationName(config.GRAPHQL_URI, operationName);

  const url = new URL('/graphql', window.location.href);

  url.port = 4000;

  return appendOperationName(url.href, operationName);
};

const http = new HttpLink({
  credentials: 'include',
  uri: makeGraphQLUri(),
});

export { http as link };
