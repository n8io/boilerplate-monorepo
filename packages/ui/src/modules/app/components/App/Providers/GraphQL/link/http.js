import { HttpLink } from '@apollo/client';
import { config } from 'config';

const http = new HttpLink({
  credentials: 'include', // Enables cookie writing to clients when 'include' (E.g. in our userLogin mutation)
  uri: config.GRAPHQL_URI,
});

export { http as link };
