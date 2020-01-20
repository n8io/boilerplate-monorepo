import { onError } from 'apollo-link-error';

const link = onError(({ graphQLErrors, networkError }) => {
  // eslint-disable-next-line no-console
  console.error('Received some errors', { graphQLErrors, networkError });
});

export { link };
