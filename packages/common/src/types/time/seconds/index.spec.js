import { Time } from 'types/time';

describe('seconds', () => {
  test('to return the proper value in milliseconds', () => {
    const expected = 1000;
    const actual = Time.seconds(1);

    expect(actual).toEqual(expected);
  });
});
