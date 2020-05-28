import { FetchPolicy } from '@boilerplate-monorepo/common';
import * as UseQuery from '../useQuery';
import { QUERY_USERS, useUsers } from './useUsers';

describe('useUsers', () => {
  const options = {
    fetchPolicy: FetchPolicy.CACHE_AND_NETWORK,
    option: 'OPTION',
  };

  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    useUsers(options);

    td.verify(useQuery(QUERY_USERS, options));
  });
});
