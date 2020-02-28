import { ApolloLink } from '@apollo/client';
import { link as auth } from './auth';
import { link as automatedPersistedQueries } from './automatedPersistedQueries';
import { link as http } from './http';
import { link as onError } from './onError';
import { link as retry } from './retry';
import { link as stripTypenames } from './stripTypenames';

const link = ApolloLink.from([
  auth,
  retry,
  onError,
  // eslint-disable-next-line no-process-env
  ...(process.env.NODE_ENV === 'production' ? [automatedPersistedQueries] : []),
  stripTypenames,
  http,
]);

export { link };
