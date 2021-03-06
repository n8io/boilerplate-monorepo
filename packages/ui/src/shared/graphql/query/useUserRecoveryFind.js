import { gql } from '@apollo/client';
import { FetchPolicy } from '@boilerplate-monorepo/common';
import { useLazyQuery } from '../useLazyQuery';
import { useQuery } from '../useQuery';

const QUERY_USER_RECOVERY_FIND = gql`
  query userRecoveryFind($account: String!) {
    userRecoveryFind(account: $account) {
      emailMasked
      id
    }
  }
`;

const useUserRecoveryFind = ({ isLazy, ...options }) => {
  const actualOptions = {
    fetchPolicy: FetchPolicy.NO_CACHE,
    ...options,
  };

  return isLazy
    ? useLazyQuery(QUERY_USER_RECOVERY_FIND, actualOptions)
    : useQuery(QUERY_USER_RECOVERY_FIND, actualOptions);
};

export { QUERY_USER_RECOVERY_FIND, useUserRecoveryFind };
