import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_REGISTER = gql`
  mutation userRegister($input: UserRegisterInput!) {
    userRegister(input: $input)
  }
`;

/**
 * UserRegisterInput
 * @param email - String!
 * @param familyName - String!
 * @param givenName - String!
 * @param password - String!
 * @param role - String [Defaults to &#34;USER&#34;]
 * @param username - String!
 */
const useUserRegister = options => useMutation(MUTATION_USER_REGISTER, options);

export { useUserRegister };
