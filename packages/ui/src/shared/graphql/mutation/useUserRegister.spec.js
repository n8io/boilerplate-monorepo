import * as UseMutation from '../useMutation';
import { MUTATION_USER_REGISTER, useUserRegister } from './useUserRegister';

describe('useUserRegister', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserRegister(options);

    td.verify(useMutation(MUTATION_USER_REGISTER, options));
  });
});
