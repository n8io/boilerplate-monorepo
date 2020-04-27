import { Utils } from 'utils';

const passwordNew = 'NEW_Pa$$w0rD';

const apiExample = Utils.makeSafeExample({
  passwordConfirm: passwordNew,
  passwordCurrent: 'CURRENT_Pa$$w0rD',
  passwordNew,
});

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, uiExample };
