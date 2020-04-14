import { Email } from 'types/email';
import { makeSafeExample } from '../utils/makeSafeExample';

const STRONG_PASSWORD = 'Str0ngP4$$word';

const apiExample = makeSafeExample({
  email: Email.apiExample(),
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  passwordConfirm: STRONG_PASSWORD,
  passwordNew: STRONG_PASSWORD,
  username: 'USERNAME',
});

const uiExample = makeSafeExample(apiExample());

export { apiExample, uiExample };
