import * as UseQuery from '../useQuery';
import { QUERY_USER_SELF, useUserSelf } from './useUserSelf';

describe('useUserSelf', () => {
  const options = { option: 'OPTION' };
  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    useUserSelf(options);

    td.verify(useQuery(QUERY_USER_SELF, options));
  });
});
