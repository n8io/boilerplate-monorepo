import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_SELF_PROFILE_UPDATE,
  useUserSelfProfileUpdate,
} from './useUserSelfProfileUpdate';

describe('useUserSelfProfileUpdate', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserSelfProfileUpdate(options);

    td.verify(useMutation(MUTATION_USER_SELF_PROFILE_UPDATE, options));
  });
});
