import { Utils } from 'utils';

describe('toBool', () => {
  const tests = [
    { description: 'true', expected: true, input: true },
    { description: '"true"', expected: true, input: 'true' },
    { description: '"True"', expected: true, input: 'True' },
    { description: '"1"', expected: true, input: '1' },
    { description: '1', expected: true, input: 1 },
    { description: 'false', expected: false, input: false },
    { description: '0', expected: false, input: 0 },
    { description: 'null', expected: false, input: null },
    { description: 'undefined', expected: false, input: undefined },
    { description: 'NaN', expected: false, input: NaN },
  ];

  tests.forEach(({ input, description, expected }) => {
    test(`${description} returns ${expected}`, () => {
      const actual = Utils.toBool(input);

      expect(actual).toEqual(expected);
    });
  });
});
