import * as UseMutation from '../useMutation';
import { MUTATION_USER_LOGOUT, useUserLogout } from './useUserLogout';

describe('useUserLogout', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserLogout(options);

    td.verify(useMutation(MUTATION_USER_LOGOUT, options));
  });
});
