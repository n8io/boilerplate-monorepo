import { Email } from 'types/email';
import { Utils } from 'utils';

const STRONG_PASSWORD = 'Str0ngP4$$word';

const apiExample = Utils.makeSafeExample({
  captchaToken: 'CAPTCHA_TOKEN',
  email: Email.apiExample(),
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  passwordNew: STRONG_PASSWORD,
  username: 'USERNAME',
});

const uiExample = Utils.makeSafeExample({
  ...apiExample(),
  passwordConfirm: STRONG_PASSWORD,
});

export { apiExample, uiExample };
