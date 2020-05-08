import { gql } from '@apollo/client';
import { FetchPolicy } from '@boilerplate-monorepo/common';
import { useQuery } from '../useQuery';

export const QUERY_USERS = gql`
  query users($input: PaginationInput!) {
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

const useUsers = options =>
  useQuery(QUERY_USERS, {
    fetchPolicy: FetchPolicy.NO_CACHE,
    ...options,
  });

export { useUsers };
