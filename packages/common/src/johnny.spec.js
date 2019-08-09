import { johnny } from './johnny';

describe('johnny', () => {
  test('returns the correct text', () => {
    const actual = johnny();

    expect(actual).toEqual('Honky donkey!');
  });
});
