import { UserPasswordResetInput } from '.';

const { isValid } = UserPasswordResetInput;

describe('user reset password input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserPasswordResetInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without an id', async () => {
      const input = UserPasswordResetInput.apiExample({ id: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a token', async () => {
      const input = UserPasswordResetInput.apiExample({ token: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a new password', async () => {
      const input = UserPasswordResetInput.apiExample({
        passwordNew: null,
      });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
