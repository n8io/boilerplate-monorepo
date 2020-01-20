import { ApolloLink } from '@apollo/client';
import { link as auth } from './auth';
import { link as http } from './http';
import { link as onError } from './onError';
import { link as request } from './request';

const link = ApolloLink.from([auth, request, onError, http]);

export { link };
