import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_RECOVERY_NOTIFY = gql`
  mutation userRecoveryNotify($input: UserRecoveryNotifyInput!) {
    userRecoveryNotify(input: $input)
  }
`;

/**
 * UserRecoveryNotifyInput
 * @param id - ID!
 * @param notificationMethod - UserRecoveryNotificationMethod!
 */
const useUserRecoveryNotify = options =>
  useMutation(MUTATION_USER_RECOVERY_NOTIFY, options);

export { useUserRecoveryNotify };
