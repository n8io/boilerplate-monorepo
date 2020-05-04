import { Utils } from 'utils';

const apiExample = Utils.makeSafeExample({
  password: 'PASSWORD',
  username: 'USERNAME',
});

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, uiExample };
