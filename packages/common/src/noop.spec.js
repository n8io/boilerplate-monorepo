import { noop } from './noop';

describe('noop', () => {
  test('returns null', () => {
    const actual = noop();

    expect(actual).toBeNull();
  });
});
