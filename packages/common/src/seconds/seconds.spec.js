import { seconds } from '.';

describe('seconds', () => {
  test('to return the proper value in milliseconds', () => {
    const expected = 1000;
    const actual = seconds(1);

    expect(actual).toEqual(expected);
  });
});
