import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const USER_SELF_UPDATE = gql`
  mutation userSelfUpdate($input: UserSelfUpdateInput!) {
    userSelfUpdate(input: $input)
  }
`;

const useUserSelfUpdate = options => useMutation(USER_SELF_UPDATE, options);

export { useUserSelfUpdate };
