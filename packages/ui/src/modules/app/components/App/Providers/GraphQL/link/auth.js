import { ApolloLink } from '@apollo/client';
import { AccessToken } from 'types/accessToken';

const auth = new ApolloLink((operation, forward) => {
  const token = AccessToken.read();

  if (!token) return forward(operation);

  operation.setContext({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  return forward(operation);
});

export { auth as link };
