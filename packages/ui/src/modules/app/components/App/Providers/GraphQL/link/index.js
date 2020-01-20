import { ApolloLink } from '@apollo/client';
import { link as auth } from './auth';
import { link as http } from './http';
import { link as onError } from './onError';
import { link as retry } from './retry';

const link = ApolloLink.from([auth, retry, onError, http]);

export { link };
