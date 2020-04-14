import { UserRecoveryNotifyInput } from '.';

const { isValid } = UserRecoveryNotifyInput;

describe('user recovery notify input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserRecoveryNotifyInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a notification method', async () => {
      const input = UserRecoveryNotifyInput.apiExample({
        notificationMethod: null,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without an id', async () => {
      const input = UserRecoveryNotifyInput.apiExample({ id: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
