import { ApolloLink } from '@apollo/client';
import { link as auth } from './auth';
import { link as http } from './http';
import { link as onError } from './onError';

const link = ApolloLink.from([auth, onError, http]);

export { link };
