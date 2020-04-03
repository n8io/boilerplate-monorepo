import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  after: null,
  first: 10,
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
