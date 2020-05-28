import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_SELF_UPDATE = gql`
  mutation userSelfUpdate($input: UserSelfUpdateInput!) {
    userSelfUpdate(input: $input) {
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
 * UserSelfUpdateInput
 * @param email - EmailAddress!
 * @param familyName - String
 * @param givenName - String
 */
const useUserSelfUpdate = (options) =>
  useMutation(MUTATION_USER_SELF_UPDATE, options);

export { MUTATION_USER_SELF_UPDATE, useUserSelfUpdate };
