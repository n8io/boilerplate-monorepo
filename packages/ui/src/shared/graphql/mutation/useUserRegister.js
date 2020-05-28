import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_REGISTER = gql`
  mutation userRegister($input: UserRegisterInput!) {
    userRegister(input: $input)
  }
`;

/**
 * UserRegisterInput
 * @param captchaToken - String!
 * @param email - EmailAddress!
 * @param familyName - String!
 * @param givenName - String!
 * @param passwordNew - String!
 * @param username - String!
 */
const useUserRegister = (options) =>
  useMutation(MUTATION_USER_REGISTER, options);

export { MUTATION_USER_REGISTER, useUserRegister };
