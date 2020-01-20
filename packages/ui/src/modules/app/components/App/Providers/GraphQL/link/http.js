import { HttpLink } from '@apollo/client';
import { config } from 'config';

const http = new HttpLink({
  credentials: 'include',
  uri: config.GRAPHQL_URI,
});

export { http as link };
