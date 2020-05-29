import { UserSelfProfileUpdateInput } from '.';

const { isValid } = UserSelfProfileUpdateInput;

describe('user self update input validation', () => {
  describe('is valid', () => {
    test('with a valid input', async () => {
      const input = UserSelfProfileUpdateInput.apiExample();
      const actual = await isValid(input);

      expect(actual).toEqual(true);
    });
  });

  describe('is not valid', () => {
    test('without a valid email', async () => {
      const input = UserSelfProfileUpdateInput.apiExample({
        email: 'NOT_A_VALID_EMAIL',
      });

      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a family name', async () => {
      const input = UserSelfProfileUpdateInput.apiExample({ familyName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });

    test('without a given name', async () => {
      const input = UserSelfProfileUpdateInput.apiExample({ givenName: null });
      const actual = await isValid(input);

      expect(actual).toEqual(false);
    });
  });
});
