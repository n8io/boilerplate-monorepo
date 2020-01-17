import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_REGISTER = gql`
  mutation userRegister($input: UserRegisterInput!) {
    userRegister(input: $input)
  }
`;

const useUserRegister = options => useMutation(MUTATION_USER_REGISTER, options);

export { useUserRegister };
