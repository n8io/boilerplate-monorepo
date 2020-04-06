import { makeSafeExample } from '../utils/makeSafeExample';

const passwordNew = 'NEW_Pa$$w0rD';

const apiExample = makeSafeExample({
  passwordConfirm: passwordNew,
  passwordCurrent: 'CURRENT_Pa$$w0rD',
  passwordNew,
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
