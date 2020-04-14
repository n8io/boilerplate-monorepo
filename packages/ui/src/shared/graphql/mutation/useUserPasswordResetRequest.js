import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_PASSWORD_RESET_REQUEST = gql`
  mutation userPasswordResetRequest($input: UserPasswordResetRequestInput!) {
    userPasswordResetRequest(input: $input)
  }
`;

/**
 * UserPasswordResetRequestInput
 * @param id - ID!
 * @param notificationMethod - UserRecoveryNotificationMethod!
 */
const useUserPasswordResetRequest = options =>
  useMutation(MUTATION_USER_PASSWORD_RESET_REQUEST, options);

export { useUserPasswordResetRequest };
