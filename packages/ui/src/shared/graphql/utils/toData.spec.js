import { toData } from './toData';

describe('toData', () => {
  test('grabs data when present', () => {
    const something = 'SOMETHING';
    const queryData = { data: { something } };

    expect(toData(queryData)).toEqual({
      data: something,
    });
  });
});
