import { ApolloLink, Observable } from '@apollo/client';
import { config } from 'config';
import jwtDecode from 'jwt-decode';
import { AccessToken } from 'types/accessToken';

const fetchAccessToken = operation => {
  const uri = new URL(config.GRAPHQL_URI);

  const updateToken = ({ ok, token }) => {
    if (!ok) return;

    AccessToken.set(token);

    operation.setContext({
      headers: {
        authorization: `bearer ${token}`,
      },
    });
  };

  uri.pathname = 'refresh_token';

  return (
    fetch(uri.href, {
      credentials: 'include',
      method: 'POST',
    })
      .then(response => response.json())
      .then(updateToken)
      // eslint-disable-next-line no-console
      .catch(err => console.error('Token refresh failed', err))
  );
};

const isTokenValidOrUndefined = () => {
  const token = AccessToken.read();

  if (!token) {
    return true;
  }

  try {
    const { exp } = jwtDecode(token);

    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
};

const link = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle = null;

      Promise.resolve(operation)
        .then(async () => {
          if (isTokenValidOrUndefined()) return;

          await fetchAccessToken(operation);
        })
        .then(() => {
          handle = forward(operation).subscribe({
            complete: observer.complete.bind(observer),
            error: observer.error.bind(observer),
            next: observer.next.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export { link };
