import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

const QUERY_USER_SELF = gql`
  query userSelf {
    userSelf {
      email
      familyName
      givenName
      id
      role
      username
    }
  }
`;

const useUserSelf = (options) => useQuery(QUERY_USER_SELF, options);

export { QUERY_USER_SELF, useUserSelf };
