import { Time } from 'types/time';

describe('seconds utilities', () => {
  describe('seconds', () => {
    test('to return the proper value in milliseconds', () => {
      const expected = 1000;
      const actual = Time.seconds(1);

      expect(actual).toEqual(expected);
    });
  });

  describe('minutesToSeconds', () => {
    test('to return the proper value in seconds', () => {
      const expected = 10 * 60;
      const actual = Time.minutesToSeconds(10);

      expect(actual).toEqual(expected);
    });
  });
});
