import { Observable } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { config } from 'config';
import { AccessToken } from 'types/accessToken';
import { history } from 'types/history';
import { Route } from 'types/route';

const UNAUTHENTICATED = 'UNAUTHENTICATED';

const updateToken = ({ token }) => {
  if (!token) {
    // eslint-disable-next-line no-console
    console.error('Could not fetch a new access token, logging out...');

    setTimeout(() => {
      history.push(Route.LOGOUT.path);
    }, 1);

    return null;
  }

  // Set the token, null or not
  AccessToken.set(token);

  return token;
};

const fetchAccessToken = () => {
  const uri = new URL(config.GRAPHQL_URI);

  uri.pathname = 'refresh_token';

  return fetch(uri.href, {
    credentials: 'include',
    method: 'POST',
  })
    .then((response) => response.json())
    .then(updateToken);
};

const promiseToObservable = (promise) => {
  return new Observable((subscriber) => {
    promise.then((value) => {
      if (subscriber.closed) return;

      if (value) {
        subscriber.next(value);
      }

      subscriber.complete();
    }, subscriber.error);
  });
};

const link = onError(
  // eslint-disable-next-line max-statements
  ({ forward, graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        const { extensions, message, path } = error;
        const { code } = extensions;

        switch (code) {
          case UNAUTHENTICATED: {
            const oldHeaders = operation.getContext().headers;
            const promise = fetchAccessToken();

            return promiseToObservable(promise).flatMap(() => {
              const token = AccessToken.read();

              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `bearer ${token}`,
                },
              });

              return forward(operation);
            });
          }
          default: {
            // eslint-disable-next-line no-console
            console.error(
              `[${code}]: Failed request for '${path}'. ${message}`,
              error
            );

            return undefined;
          }
        }
      }
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.error(`[NETWORK_ERROR]: ${networkError}`, networkError);

      return undefined;
    }

    return undefined;
  }
);

export { link };
