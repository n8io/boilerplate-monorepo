import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  email: 'EMAIL@EMAIL.COM',
  username: 'USERNAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
