import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  password: 'Str0ngP4$$word',
  username: 'USERNAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
