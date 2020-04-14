import { UserSelfSecurityUpdateInput } from '.';

const { isValid } = UserSelfSecurityUpdateInput;

describe('user self security update input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserSelfSecurityUpdateInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a confirmation password', async () => {
      const input = UserSelfSecurityUpdateInput.apiExample({
        passwordConfirm: null,
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
