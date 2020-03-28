import { makeSafeExample } from '../utils/makeSafeExample';

const apiExample = makeSafeExample({
  email: 'EMAIL@EMAIL.COM',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
