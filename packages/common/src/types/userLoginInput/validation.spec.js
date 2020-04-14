import { UserLoginInput } from '.';

const { isValid } = UserLoginInput;

describe('user input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserLoginInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a username', async () => {
      const input = UserLoginInput.apiExample({ username: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a password', async () => {
      const input = UserLoginInput.apiExample({ password: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
