import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

export const QUERY_USERS = gql`
  query users($input: UsersInput!) {
    users(input: $input) {
      edges
      pageInfo
    }
  }
`;

const useUsers = options => useQuery(QUERY_USERS, options);

export { useUsers };
