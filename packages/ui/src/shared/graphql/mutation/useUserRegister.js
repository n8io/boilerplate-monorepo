import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_REGISTER = gql`
  mutation userRegister(
    $input: UserRegisterInput!
    $otherInput: UserRegisterInput!
  ) {
    userRegister(input: $input, otherInput: $otherInput) {
      email
      id
      role
      username
    }
  }
`;

/**
 * UserRegisterInput
 * @param email - String!
 * @param password - String!
 * @param role - String [Defaults to &#34;USER&#34;]
 * @param username - String!
 */
const useUserRegister = options => useMutation(MUTATION_USER_REGISTER, options);

export { useUserRegister };
