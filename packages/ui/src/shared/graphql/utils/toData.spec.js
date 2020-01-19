import { toData } from './toData';

describe('toData', () => {
  const makeData = data => ({ data });

  test('returns undefined for an empty object', () => {
    expect(toData(makeData({}))).toEqual({ data: undefined });
  });

  test('returns a value for an object with at least one prop', () => {
    const something = 'SOMETHING';

    expect(toData(makeData({ something }))).toEqual({ data: something });
  });

  describe('properly handles primitives', () => {
    const tests = [
      { input: undefined, name: 'undefined' },
      { input: null, name: 'null' },
      { input: true, name: 'a boolean' },
      { input: () => null, name: 'a function' },
      { input: [], name: 'an array' },
      { input: 42, name: 'a number' },
      { input: 'INPUT', name: 'a string' },
      { input: Symbol('INPUT'), name: 'a symbol' },
      { input: new File([], 'INPUT'), name: 'a file' },
    ];

    tests.forEach(({ input, expected = input, name }) => {
      test(`when the value is ${name}`, () => {
        expect(toData(makeData(input))).toEqual(makeData(expected));
      });
    });
  });
});
