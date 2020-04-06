import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_SELF_SECURITY_UPDATE = gql`
  mutation userSelfSecurityUpdate($input: UserSelfSecurityUpdateInput!) {
    userSelfSecurityUpdate(input: $input)
  }
`;

/**
 * UserSelfSecurityUpdateInput
 * @param passwordCurrent - String!
 * @param passwordNew - String!
 */
const useUserSelfSecurityUpdate = options =>
  useMutation(MUTATION_USER_SELF_SECURITY_UPDATE, options);

export { useUserSelfSecurityUpdate };
