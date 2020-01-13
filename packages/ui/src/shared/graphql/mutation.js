import { gql } from '@apollo/client';

const USER_LOGIN = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input)
  }
`;

const USER_REGISTER = gql`
  mutation userRegister($input: UserRegisterInput!) {
    userRegister(input: $input)
  }
`;

export const Mutation = {
  USER_LOGIN,
  USER_REGISTER,
};
