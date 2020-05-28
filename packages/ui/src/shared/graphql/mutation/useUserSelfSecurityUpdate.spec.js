import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_SELF_SECURITY_UPDATE,
  useUserSelfSecurityUpdate,
} from './useUserSelfSecurityUpdate';

describe('useUserSelfSecurityUpdate', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserSelfSecurityUpdate(options);

    td.verify(useMutation(MUTATION_USER_SELF_SECURITY_UPDATE, options));
  });
});
