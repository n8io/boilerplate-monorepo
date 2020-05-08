import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_REVOKE_REFRESH_TOKENS = gql`
  mutation userRevokeRefreshTokens($id: ID!) {
    userRevokeRefreshTokens(id: $id)
  }
`;

const useUserRevokeRefreshTokens = options =>
  useMutation(MUTATION_USER_REVOKE_REFRESH_TOKENS, options);

export { useUserRevokeRefreshTokens };
