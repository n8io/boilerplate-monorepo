import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

export const QUERY_USERS = gql`
  query users($input: UsersInput!) {
    users(input: $input) {
      edges {
        cursor
        node {
          id
          email
          role
          username
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const useUsers = options => useQuery(QUERY_USERS, options);

export { useUsers };
