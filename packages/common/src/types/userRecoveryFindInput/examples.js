import { Utils } from 'utils';

const apiExample = Utils.makeSafeExample({
  account: 'ACCOUNT',
});

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, uiExample };
