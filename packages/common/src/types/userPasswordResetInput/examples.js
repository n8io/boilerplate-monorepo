import { makeSafeExample } from '../utils/makeSafeExample';

const STRONG_PASSWORD = 'Str0ngP4$$word';

const apiExample = makeSafeExample({
  id: 'ID',
  passwordConfirm: STRONG_PASSWORD,
  passwordNew: STRONG_PASSWORD,
  token: 'TOKEN',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
