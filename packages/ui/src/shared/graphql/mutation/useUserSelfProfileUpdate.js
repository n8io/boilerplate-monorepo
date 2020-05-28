import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_SELF_PROFILE_UPDATE = gql`
  mutation userSelfProfileUpdate($input: UserSelfProfileUpdateInput!) {
    userSelfProfileUpdate(input: $input) {
      email
      familyName
      givenName
      id
      role
      username
    }
  }
`;

/**
 * UserSelfProfileUpdateInput
 * @param email - EmailAddress!
 * @param familyName - String
 * @param givenName - String
 */
const useUserSelfProfileUpdate = (options) =>
  useMutation(MUTATION_USER_SELF_PROFILE_UPDATE, options);

export { MUTATION_USER_SELF_PROFILE_UPDATE, useUserSelfProfileUpdate };
