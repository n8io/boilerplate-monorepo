import { gql } from '@apollo/client';
import { useQuery } from '../useQuery';

export const QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE = gql`
  query userPasswordResetTokenValidate(
    $input: UserPasswordResetTokenValidateInput!
  ) {
    userPasswordResetTokenValidate(input: $input)
  }
`;

const useUserPasswordResetTokenValidate = (options) =>
  useQuery(QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE, options);

export { useUserPasswordResetTokenValidate };
