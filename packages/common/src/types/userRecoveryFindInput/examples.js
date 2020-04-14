import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  account: 'ACCOUNT',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
