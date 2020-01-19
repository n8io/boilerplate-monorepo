import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

export const QUERY_USER_SELF = gql`
  query userSelf {
    userSelf {
      email
      id
      role
      username
    }
  }
`;

const useUserSelf = options => useQuery(QUERY_USER_SELF, options);

export { useUserSelf };
