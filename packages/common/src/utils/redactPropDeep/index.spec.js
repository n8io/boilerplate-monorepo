import { Utils } from 'utils';

const redacted = '**********';

describe('redactPropDeep', () => {
  test('redacts a prop recursively', () => {
    const prop = 'prop';

    const input = {
      a: {
        b: { prop },
        c: { prop },
      },
    };

    const actual = Utils.redactPropDeep(prop)(input);

    const expected = {
      a: {
        b: { [prop]: redacted },
        c: { [prop]: redacted },
      },
    };

    expect(actual).toEqual(expected);
  });
});
