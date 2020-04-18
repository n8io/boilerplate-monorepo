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
      const tooSmallLength = UserRecoveryFindInput.Limits.account.min - 1;
      const account = 'a'.padEnd(tooSmallLength, 'a');

      const input = UserRecoveryFindInput.apiExample({
        account,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('with an account that is too long', async () => {
      const tooLongLength = UserRecoveryFindInput.Limits.account.max + 1;
      const account = 'a'.padEnd(tooLongLength, 'a');

      const input = UserRecoveryFindInput.apiExample({
        account,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
