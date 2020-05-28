import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_REVOKE_REFRESH_TOKENS,
  useUserRevokeRefreshTokens,
} from './useUserRevokeRefreshTokens';

describe('useUserRevokeRefreshTokens', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserRevokeRefreshTokens(options);

    td.verify(useMutation(MUTATION_USER_REVOKE_REFRESH_TOKENS, options));
  });
});
