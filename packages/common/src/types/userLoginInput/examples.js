import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  password: 'PASSWORD',
  username: 'USERNAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
