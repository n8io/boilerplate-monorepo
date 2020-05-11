import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_SELF_UPDATE = gql`
  mutation userSelfUpdate($input: UserSelfUpdateInput!) {
    userSelfUpdate(input: $input) {
      email
      id
      role
      username
    }
  }
`;

/**
 * UserSelfUpdateInput
 * @param email - String!
 */
const useUserSelfUpdate = (options) =>
  useMutation(MUTATION_USER_SELF_UPDATE, options);

export { useUserSelfUpdate };
