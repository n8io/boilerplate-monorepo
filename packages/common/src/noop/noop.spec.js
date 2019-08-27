import { noop } from '.';

describe('noop', () => {
  test('returns null', () => {
    const actual = noop();

    expect(actual).toBeNull();
  });
});
