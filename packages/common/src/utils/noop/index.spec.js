import { Utils } from 'utils';

describe('noop', () => {
  test('returns null', () => {
    const actual = Utils.noop();

    expect(actual).toBeNull();
  });
});
