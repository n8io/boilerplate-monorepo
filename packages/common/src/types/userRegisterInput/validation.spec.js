import { UserRegisterInput } from '.';

const { ErrorKeys, isValid } = UserRegisterInput;

describe('user input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserRegisterInput.uiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a family name', async () => {
      const input = UserRegisterInput.uiExample({ familyName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a given name', async () => {
      const input = UserRegisterInput.uiExample({ givenName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a valid email', async () => {
      const input = UserRegisterInput.uiExample({
        email: 'NOT_A_VALID_EMAIL',
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a username', async () => {
      const input = UserRegisterInput.uiExample({ username: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    describe('because password', () => {
      test(`does not match confirm password`, async () => {
        const input = UserRegisterInput.uiExample({
          passwordConfirm: 'DOES_NOT_MATCH',
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is too short', async () => {
        const tooSmallLength = UserRegisterInput.Limits.passwordNew.min - 1;
        const passwordNew = 'Aa1!'.padEnd(tooSmallLength, 'a');

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is too long', async () => {
        const tooLongLength = UserRegisterInput.Limits.passwordNew.max + 1;
        const passwordNew = 'Aa1!'.padEnd(tooLongLength, 'a');

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is missing an uppercase letter', async () => {
        const passwordNew = 'a1!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'a'
        );

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is missing a lower letter', async () => {
        const passwordNew = 'A1!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is missing a number', async () => {
        const passwordNew = 'Aa!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });

      test('is missing a special character', async () => {
        const passwordNew = 'Aa1'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const input = UserRegisterInput.uiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(input);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('when invalid, validation throws', () => {
    test('when a password that does not meet the password requirements', async () => {
      const weakPassword = 'WEAK_PASSWORD';

      const input = UserRegisterInput.uiExample({
        passwordConfirm: weakPassword,
        passwordNew: weakPassword,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(input)
      ).rejects.toThrow(ErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS);
    });

    test('when the confirm password does not match', async () => {
      const passwordConfirm = 'PASSWORD_THAT_DOES_NOT_MATCH';
      const passwordNew = 'PASSWORD';

      const input = UserRegisterInput.uiExample({
        passwordConfirm,
        passwordNew,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(input)
      ).rejects.toThrow(ErrorKeys.CONFIRM_PASSWORD_MISMATCH);
    });
  });
});
