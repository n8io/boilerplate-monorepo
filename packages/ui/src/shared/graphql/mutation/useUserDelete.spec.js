import * as UseMutation from '../useMutation';
import { MUTATION_USER_DELETE, useUserDelete } from './useUserDelete';

describe('useUserDelete', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserDelete(options);

    td.verify(useMutation(MUTATION_USER_DELETE, options));
  });
});
