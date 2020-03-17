import { UserLoginInput } from '.';

const { ErrorKeys, isValid } = UserLoginInput;

describe('user input validation', () => {
  describe('is valid', () => {
    test('with a valid user input', async () => {
      const userInput = UserLoginInput.apiExample();
      const actual = await isValid(userInput);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a username', async () => {
      const userInput = UserLoginInput.apiExample({ username: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    describe('because password', () => {
      test('is too short', async () => {
        const tooSmallLength = UserLoginInput.Limits.password.min - 1;
        const password = 'Aa1!'.padEnd(tooSmallLength, 'a');
        const userInput = UserLoginInput.apiExample({ password });
        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing an uppercase letter', async () => {
        const password = 'a1!'.padEnd(UserLoginInput.Limits.password.min, 'a');
        const userInput = UserLoginInput.apiExample({ password });
        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a lower letter', async () => {
        const password = 'A1!'.padEnd(UserLoginInput.Limits.password.min, 'A');
        const userInput = UserLoginInput.apiExample({ password });
        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a number', async () => {
        const password = 'Aa!'.padEnd(UserLoginInput.Limits.password.min, 'A');
        const userInput = UserLoginInput.apiExample({ password });
        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });

      test('is missing a special character', async () => {
        const password = 'Aa1'.padEnd(UserLoginInput.Limits.password.min, 'A');
        const userInput = UserLoginInput.apiExample({ password });
        const actual = await isValid(userInput);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('when invalid, validation throws', () => {
    test('when a password that does not meet the password requirements', async () => {
      const weakPassword = 'WEAK_PASSWORD';
      const userInput = UserLoginInput.apiExample({ password: weakPassword });

      await expect(
        UserLoginInput.validationSchema.validate(userInput)
      ).rejects.toThrow(ErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS);
    });
  });
});
