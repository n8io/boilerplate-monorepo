import { FetchPolicy } from '@boilerplate-monorepo/common';
import * as UseLazyQuery from '../useLazyQuery';
import * as UseQuery from '../useQuery';
import {
  QUERY_USER_RECOVERY_FIND,
  useUserRecoveryFind,
} from './useUserRecoveryFind';

describe('useUserRecoveryFind', () => {
  const options = {
    fetchPolicy: FetchPolicy.NO_CACHE,
    option: 'OPTION',
  };

  let useLazyQuery = null;
  let useQuery = null;

  beforeEach(() => {
    useLazyQuery = td.replace(UseLazyQuery, 'useLazyQuery');
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  describe('when is a lazy query', () => {
    const isLazy = true;
    const lazyOptions = { ...options, isLazy };

    test('should pass along the proper parameters to useLazyQuery', () => {
      useUserRecoveryFind(lazyOptions);

      td.verify(useLazyQuery(QUERY_USER_RECOVERY_FIND, options));
    });
  });

  describe('when NOT a lazy query', () => {
    const isLazy = false;
    const notLazyOptions = { ...options, isLazy };

    test('should pass along the proper parameters to useQuery', () => {
      useUserRecoveryFind(notLazyOptions);

      td.verify(useQuery(QUERY_USER_RECOVERY_FIND, options));
    });
  });
});
