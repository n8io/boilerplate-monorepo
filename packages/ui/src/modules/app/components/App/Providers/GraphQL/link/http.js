import { HttpLink } from '@apollo/client';
import { config } from 'config';

const makeGraphQLUri = () => {
  if (config.GRAPHQL_URI) return config.GRAPHQL_URI;

  const url = new URL('/graphql', window.location.href);

  url.port = 4000;

  return url.href;
};

const http = new HttpLink({
  credentials: 'include',
  uri: makeGraphQLUri(),
});

export { http as link };
