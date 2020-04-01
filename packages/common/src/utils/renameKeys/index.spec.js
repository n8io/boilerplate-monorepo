import { Utils } from 'utils';

describe('renameKeys', () => {
  test('renames keys properly', () => {
    const input = { prop: 'PROP' };
    const actual = Utils.renameKeys({ prop: 'renamed' }, input);
    const expected = { renamed: input.prop };

    expect(actual).toEqual(expected);
  });

  test('does not touch other props', () => {
    const input = { otherProp: 'otherProp' };
    const actual = Utils.renameKeys({ prop: 'renamed' }, input);

    expect(actual).toEqual(input);
  });

  describe('does not explode', () => {
    test('on null', () => {
      const input = null;
      const actual = Utils.renameKeys({ prop: 'renamed' }, input);

      expect(actual).toEqual(input);
    });

    test('on undefined', () => {
      const input = undefined;
      const actual = Utils.renameKeys({ prop: 'renamed' }, input);

      expect(actual).toEqual(input);
    });
  });
});
