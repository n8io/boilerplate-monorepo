import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_PASSWORD_RESET = gql`
  mutation userPasswordReset($input: UserPasswordResetInput!) {
    userPasswordReset(input: $input)
  }
`;

/**
 * UserPasswordResetInput
 * @param id - ID!
 * @param passwordNew - String!
 * @param token - String!
 */
const useUserPasswordReset = (options) =>
  useMutation(MUTATION_USER_PASSWORD_RESET, options);

export { MUTATION_USER_PASSWORD_RESET, useUserPasswordReset };
