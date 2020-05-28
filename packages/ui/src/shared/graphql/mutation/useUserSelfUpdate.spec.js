import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_SELF_UPDATE,
  useUserSelfUpdate,
} from './useUserSelfUpdate';

describe('useUserSelfUpdate', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserSelfUpdate(options);

    td.verify(useMutation(MUTATION_USER_SELF_UPDATE, options));
  });
});
