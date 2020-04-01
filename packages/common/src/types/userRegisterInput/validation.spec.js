import { UserRegisterInput } from 'types/userRegisterInput';

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
          confirmPassword: 'DOES_NOT_MATCH',
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is too short', async () => {
        const tooSmallLength = UserRegisterInput.Limits.password.min - 1;
        const password = 'Aa1!'.padEnd(tooSmallLength, 'a');

        const userInput = UserRegisterInput.apiExample({
          confirmPassword: password,
          password,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing an uppercase letter', async () => {
        const password = 'a1!'.padEnd(
          UserRegisterInput.Limits.password.min,
          'a'
        );

        const userInput = UserRegisterInput.apiExample({
          confirmPassword: password,
          password,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a lower letter', async () => {
        const password = 'A1!'.padEnd(
          UserRegisterInput.Limits.password.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          confirmPassword: password,
          password,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a number', async () => {
        const password = 'Aa!'.padEnd(
          UserRegisterInput.Limits.password.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          confirmPassword: password,
          password,
        });

        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a special character', async () => {
        const password = 'Aa1'.padEnd(
          UserRegisterInput.Limits.password.min,
          'A'
        );

        const userInput = UserRegisterInput.apiExample({
          confirmPassword: password,
          password,
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
        confirmPassword: weakPassword,
        password: weakPassword,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(userInput)
      ).rejects.toThrow(ErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS);
    });

    test('when the confirm password does not match', async () => {
      const confirmPassword = 'PASSWORD_THAT_DOES_NOT_MATCH';
      const password = 'PASSWORD';

      const userInput = UserRegisterInput.apiExample({
        confirmPassword,
        password,
      });

      await expect(
        UserRegisterInput.validationSchema.validate(userInput)
      ).rejects.toThrow(ErrorKeys.CONFIRM_PASSWORD_MISMATCH);
    });
  });
});
