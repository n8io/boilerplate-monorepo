import * as UseMutation from '../useMutation';
import { MUTATION_USER_LOGIN, useUserLogin } from './useUserLogin';

describe('useUserLogin', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserLogin(options);

    td.verify(useMutation(MUTATION_USER_LOGIN, options));
  });
});
