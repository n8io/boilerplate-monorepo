import { UserRecoveryFindInput } from '.';

const { isValid } = UserRecoveryFindInput;

describe('user recovery find validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserRecoveryFindInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without an account', async () => {
      const input = UserRecoveryFindInput.apiExample({ account: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('with an account that is too short', async () => {
      const accountTooShort = '__'; // Doesn't meet min length of 3

      const input = UserRecoveryFindInput.apiExample({
        account: accountTooShort,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
