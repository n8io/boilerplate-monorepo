import { UserSelfUpdateInput } from '.';

const { isValid } = UserSelfUpdateInput;

describe('user self update input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserSelfUpdateInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a valid email', async () => {
      const input = UserSelfUpdateInput.apiExample({
        email: 'NOT_A_VALID_EMAIL',
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a family name', async () => {
      const input = UserSelfUpdateInput.apiExample({ familyName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a given name', async () => {
      const input = UserSelfUpdateInput.apiExample({ givenName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
