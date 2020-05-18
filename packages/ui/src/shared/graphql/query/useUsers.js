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
          givenName
          familyName
          role
          username
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        total
      }
    }
  }
`;

const useUsers = (options) =>
  useQuery(QUERY_USERS, {
    fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
    ...options,
  });

export { useUsers };
