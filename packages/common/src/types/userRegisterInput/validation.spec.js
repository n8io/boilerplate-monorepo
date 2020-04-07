import { UserRegisterInput } from '.';

const { ErrorKeys, isValid } = UserRegisterInput;

describe('user input validation', () => {
  describe('is valid', () => {
    test('with a valid user input', async () => {
      const userInput = UserRegisterInput.apiExample();
      const actual = await isValid(userInput);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a family name', async () => {
      const userInput = UserRegisterInput.apiExample({ familyName: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    test('without a given name', async () => {
      const userInput = UserRegisterInput.apiExample({ givenName: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    test('without a valid email', async () => {
      const userInput = UserRegisterInput.apiExample({
        email: 'NOT_A_VALID_EMAIL',
      });

      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    test('without a username', async () => {
      const userInput = UserRegisterInput.apiExample({ username: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    describe('because password', () => {
      test(`does not match confirm password`, async () => {
        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: 'DOES_NOT_MATCH',
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is too short', async () => {
        const tooSmallLength = UserRegisterInput.Limits.passwordNew.min - 1;
        const passwordNew = 'Aa1!'.padEnd(tooSmallLength, 'a');

        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing an uppercase letter', async () => {
        const passwordNew = 'a1!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'a'
        );

        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a lower letter', async () => {
        const passwordNew = 'A1!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a number', async () => {
        const passwordNew = 'Aa!'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a special character', async () => {
        const passwordNew = 'Aa1'.padEnd(
          UserRegisterInput.Limits.passwordNew.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          passwordConfirm: passwordNew,
          passwordNew,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('when invalid, validation throws', () => {
    test('when a password that does not meet the password requirements', async () => {
      const weakPassword = 'WEAK_PASSWORD';

      const userInput = UserRegisterInput.apiExample({
        passwordConfirm: weakPassword,
        passwordNew: weakPassword,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(userInput)
      ).rejects.toThrow(ErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS);
    });

    test('when the confirm password does not match', async () => {
      const passwordConfirm = 'PASSWORD_THAT_DOES_NOT_MATCH';
      const passwordNew = 'PASSWORD';

      const userInput = UserRegisterInput.apiExample({
        passwordConfirm,
        passwordNew,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(userInput)
      ).rejects.toThrow(ErrorKeys.CONFIRM_PASSWORD_MISMATCH);
    });
  });
});
