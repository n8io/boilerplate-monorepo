import * as UseMutation from '../useMutation';
import {
  MUTATION_USER_PASSWORD_RESET_REQUEST,
  useUserPasswordResetRequest,
} from './useUserPasswordResetRequest';

describe('useUserPasswordResetRequest', () => {
  const options = { option: 'OPTION' };
  let useMutation = null;

  beforeEach(() => {
    useMutation = td.replace(UseMutation, 'useMutation');
  });

  test('should pass along the proper parameters to useMutation', () => {
    useUserPasswordResetRequest(options);

    td.verify(useMutation(MUTATION_USER_PASSWORD_RESET_REQUEST, options));
  });
});
