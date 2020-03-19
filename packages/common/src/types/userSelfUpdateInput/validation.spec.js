import { UserSelfUpdateInput } from '.';

const { isValid } = UserSelfUpdateInput;

describe('user self update input validation', () => {
  describe('is valid', () => {
    test('with a valid user self update input', async () => {
      const userInput = UserSelfUpdateInput.apiExample();
      const actual = await isValid(userInput);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a valid email', async () => {
      const userInput = UserSelfUpdateInput.apiExample({
        email: 'NOT_A_VALID_EMAIL',
      });

      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });

    test('without a username', async () => {
      const userInput = UserSelfUpdateInput.apiExample({ username: null });
      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });
  });
});
