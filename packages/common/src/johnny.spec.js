import { johnny } from './johnny';

describe('johnny', () => {
  test('returns the proper text', () => {
    const actual = johnny();

    expect(actual).toEqual('Honky donkey!');
  });
});
