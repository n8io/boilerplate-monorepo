import { UserSelfSecurityUpdateInput } from '.';

const { isValid } = UserSelfSecurityUpdateInput;

describe('user self update input validation', () => {
  describe('is valid', () => {
    test('with a valid user self update input', async () => {
      const userInput = UserSelfSecurityUpdateInput.apiExample();
      const actual = await isValid(userInput);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a confirmation password', async () => {
      const userInput = UserSelfSecurityUpdateInput.apiExample({
        passwordConfirm: null,
      });

      const actual = await isValid(userInput);

      expect(actual).toEqual(false);
    });
  });
});
