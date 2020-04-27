import { Utils } from 'utils';

const STRONG_PASSWORD = 'Str0ngP4$$word';

const apiExample = Utils.makeSafeExample({
  id: 'ID',
  passwordNew: STRONG_PASSWORD,
  token: 'TOKEN',
});

const uiExample = Utils.makeSafeExample({
  ...apiExample(),
  passwordConfirm: STRONG_PASSWORD,
});

export { apiExample, uiExample };
