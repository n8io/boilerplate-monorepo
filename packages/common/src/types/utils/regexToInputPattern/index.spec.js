import { regexToInputPattern } from '.';

describe('regexToInputPattern', () => {
  test('converts a regex to an input pattern', () => {
    const input = '/[A-Za-z]/u';
    const actual = regexToInputPattern(input);
    const expected = '[A-Za-z]';

    expect(actual).toEqual(expected);
  });
});
