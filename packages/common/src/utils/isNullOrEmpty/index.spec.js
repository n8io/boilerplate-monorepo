import { isNullOrEmpty } from '.';

describe('isNullOrEmpty', () => {
  describe('returns true', () => {
    test('when null', () => {
      const input = null;
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(true);
    });

    test('when undefined', () => {
      const input = undefined;
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(true);
    });

    test('when empty object', () => {
      const input = {};
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(true);
    });

    test('when empty array', () => {
      const input = [];
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(true);
    });
  });

  describe('returns false', () => {
    test('when an object with props', () => {
      const input = { prop: 'PROP' };
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(false);
    });

    test('when an array with values', () => {
      const input = [1, 2, 3];
      const actual = isNullOrEmpty(input);

      expect(actual).toBe(false);
    });
  });
});
