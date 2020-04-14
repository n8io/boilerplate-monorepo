import { UserPasswordResetRequestInput } from '.';

const { isValid } = UserPasswordResetRequestInput;

describe('user recovery notify input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserPasswordResetRequestInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a notification method', async () => {
      const input = UserPasswordResetRequestInput.apiExample({
        notificationMethod: null,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without an id', async () => {
      const input = UserPasswordResetRequestInput.apiExample({ id: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
