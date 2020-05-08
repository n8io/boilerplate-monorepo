import { gql } from '@apollo/client';
import { useMutation } from '../useMutation';

const MUTATION_USER_DELETE = gql`
  mutation userDelete($id: ID!) {
    userDelete(id: $id)
  }
`;

const useUserDelete = options => useMutation(MUTATION_USER_DELETE, options);

export { useUserDelete };
