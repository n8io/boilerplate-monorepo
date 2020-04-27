import { UnsafeProps } from 'types/unsafeProps';
import { User } from '.';

describe('user transforms', () => {
  describe('apiToDb', () => {
    test('adds a name property', () => {
      const api = User.apiExample();

      expect(User.apiToDb(api)).toHaveProperty('name');
    });

    test('lower cases email property', () => {
      const email = 'EMAIL@EXAMPLE.COM';
      const api = User.apiExample({ email });

      expect(User.apiToDb(api)).toHaveProperty('email', email.toLowerCase());
    });

    test('lower cases name property', () => {
      const familyName = 'FAMILY_NAME';
      const givenName = 'GIVEN_NAME';

      const api = User.apiExample({
        familyName,
        givenName,
      });

      expect(User.apiToDb(api)).toHaveProperty(
        'name',
        `${familyName},${givenName}`.toLowerCase()
      );
    });

    test('lower cases username property', () => {
      const username = 'USERNAME';
      const api = User.apiExample({ username });

      expect(User.apiToDb(api)).toHaveProperty(
        'username',
        username.toLowerCase()
      );
    });
  });

  describe('dbToApi', () => {
    test('to do nothing when null', () => {
      expect(User.dbToApi(null)).toBeNull();
    });

    test('removes unsafe props', () => {
      const db = {
        ...User.dbExample(),
        captchaToken: 'CAPTCHA_TOKEN',
        deletedAt: 'DELETED_AT',
        deletedBy: 'DELETED_BY',
        password: 'PASSWORD',
        passwordConfirm: 'PASSWORD_CONFIRM',
        passwordCurrent: 'PASSWORD_CURRENT',
        passwordHash: 'PASSWORD_HASH',
        passwordNew: 'PASSWORD_NEW',
        recoveryCode: 'RECOVERY_CODE',
        recoveryCodeExpiration: 'RECOVERY_CODE_EXPIRATION',
        recoveryCodeSecret: 'RECOVERY_CODE_SECRET',
      };

      const actual = User.dbToApi(db);

      UnsafeProps.forEach(unsafeProp => {
        expect(actual).not.toHaveProperty(unsafeProp);
      });
    });

    test('removes name', () => {
      const db = User.dbExample();
      const actual = User.dbToApi(db);

      expect(actual).not.toHaveProperty('name');
    });
  });
});
