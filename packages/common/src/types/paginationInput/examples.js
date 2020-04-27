import { Utils } from 'utils';

const apiExample = Utils.makeSafeExample({
  after: null,
  first: 10,
});

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, uiExample };
