import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

const QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE = gql`
  query userPasswordResetTokenValidate(
    $input: UserPasswordResetTokenValidateInput!
  ) {
    userPasswordResetTokenValidate(input: $input)
  }
`;

const useUserPasswordResetTokenValidate = (options) =>
  useQuery(QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE, options);

export {
  QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE,
  useUserPasswordResetTokenValidate,
};
