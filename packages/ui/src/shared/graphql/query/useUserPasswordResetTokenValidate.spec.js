import * as UseQuery from '../useQuery';
import {
  QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE,
  useUserPasswordResetTokenValidate,
} from './useUserPasswordResetTokenValidate';

describe('useUserPasswordResetTokenValidate', () => {
  const options = { option: 'OPTION' };
  let useQuery = null;

  beforeEach(() => {
    useQuery = td.replace(UseQuery, 'useQuery');
  });

  test('should pass along the proper parameters to useQuery', () => {
    useUserPasswordResetTokenValidate(options);

    td.verify(useQuery(QUERY_USER_PASSWORD_RESET_TOKEN_VALIDATE, options));
  });
});
