import { UserLoginInput } from '.';

const { isValid } = UserLoginInput;

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

    test('without a password', async () => {
      const userInput = UserLoginInput.apiExample({ password: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });
  });
});
