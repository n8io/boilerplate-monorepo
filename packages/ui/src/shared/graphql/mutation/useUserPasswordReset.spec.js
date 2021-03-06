import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_PASSWORD_RESET,
  useUserPasswordReset,
} from './useUserPasswordReset';

describe('useUserPasswordReset', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserPasswordReset(options);

    td.verify(useMutation(MUTATION_USER_PASSWORD_RESET, options));
  });
});
