import { DateTime } from 'types/dateTime';

const expected = new Date('1900-01-01T00:00:00Z');

describe('transforms', () => {
  describe('toSafeDate', () => {
    const tests = [
      {
        description: 'An ISO string',
        expected,
        input: '1900-01-01T00:00:00Z',
      },
      {
        description: 'A Date object',
        expected,
        input: expected,
      },
      {
        description: 'null',
        expected: null,
        input: null,
      },
      {
        description: 'undefined',
        expected: undefined,
        input: undefined,
      },
      {
        description: 'Unix timestamp',
        expected,
        input: expected.getTime(),
      },
      {
        description: 'boolean',
        expected: null,
        input: true,
      },
    ];

    tests.forEach(t => {
      test(t.description, () => {
        expect(DateTime.toSafeDate(t.input)).toEqual(t.expected);
      });
    });
  });
});
