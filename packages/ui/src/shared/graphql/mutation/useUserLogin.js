import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_LOGIN = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input)
  }
`;

/**
 * UserLoginInput
 * @param username - String!
 * @param password - String!
 */
const useUserLogin = (options) => useMutation(MUTATION_USER_LOGIN, options);

export { MUTATION_USER_LOGIN, useUserLogin };
