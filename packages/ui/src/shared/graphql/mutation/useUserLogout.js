import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_LOGOUT = gql`
  mutation userLogout {
    userLogout
  }
`;

const useUserLogout = options => useMutation(MUTATION_USER_LOGOUT, options);

export { useUserLogout };
