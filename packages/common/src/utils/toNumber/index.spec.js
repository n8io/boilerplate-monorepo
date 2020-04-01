import { Utils } from 'utils';

describe('toNumber', () => {
  test('converts a number in a string format properly', () => {
    const input = '1';
    const actual = Utils.toNumber(input);
    const expected = 1;

    expect(actual).toEqual(expected);
  });

  test('converts undefined to NaN', () => {
    const input = undefined;
    const actual = Utils.toNumber(input);
    const expected = NaN;

    expect(actual).toEqual(expected);
  });

  test('converts empty string to NaN', () => {
    const input = '';
    const actual = Utils.toNumber(input);
    const expected = NaN;

    expect(actual).toEqual(expected);
  });

  test('converts null to NaN', () => {
    const input = null;
    const actual = Utils.toNumber(input);
    const expected = NaN;

    expect(actual).toEqual(expected);
  });
});
