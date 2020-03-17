import { makeSafeExample } from '../utils/makeSafeExample';

const STRONG_PASSWORD = 'Str0ngP4$$word';

const apiExample = makeSafeExample({
  confirmPassword: STRONG_PASSWORD,
  email: 'EMAIL@EMAIL.COM',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  password: STRONG_PASSWORD,
  username: 'USERNAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
