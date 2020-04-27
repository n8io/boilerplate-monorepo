import { Utils } from 'utils';

const apiExample = Utils.makeSafeExample({
  email: 'EMAIL@EMAIL.COM',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
});

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, uiExample };
