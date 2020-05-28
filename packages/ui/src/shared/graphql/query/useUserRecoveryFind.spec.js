import { FetchPolicy } from '@boilerplate-monorepo/common';
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

  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    useUserRecoveryFind(options);

    td.verify(useQuery(QUERY_USER_RECOVERY_FIND, options));
  });
});
