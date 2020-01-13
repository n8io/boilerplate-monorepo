import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation userLogin($input: UserLoginInput!) {
    userLogin(input: $input)
  }
`;

export const Mutation = {
  LOGIN,
};
