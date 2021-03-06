import { FetchPolicy } from '@boilerplate-monorepo/common';
import * as UseQuery from '../useQuery';
import { QUERY_SYSTEM_TIME, useSystemTime } from './useSystemTime';

describe('useSystemTime', () => {
  const options = {
    fetchPolicy: FetchPolicy.NO_CACHE,
    option: 'OPTION',
  };

  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    useSystemTime(options);

    td.verify(useQuery(QUERY_SYSTEM_TIME, options));
  });
});
