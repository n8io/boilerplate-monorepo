import { queryToSql } from './queryToSql';

describe('queryToSql', () => {
  const query = {
    anotherProp: 'ANOTHER_PROP',
    bindings: ['BINDING'],
    sql: 'select * from table where binding = $1',
    transaction: false,
  };

  test('selects only the focused props', () => {
    const actual = queryToSql(query);

    const expected = {
      bindings: query.bindings,
      sql: query.sql,
      transaction: query.transaction,
    };

    expect(actual).toEqual(expected);
  });
});
