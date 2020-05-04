import knexMock from 'mock-knex';
import { queryToSql } from './queryToSql';

const stubQueries = (mutateFn, responses = []) => {
  const tracker = knexMock.getTracker();

  tracker.install();

  let queries = [];

  tracker.on('query', (query, step) => {
    queries = [...queries, queryToSql(query)];
    mutateFn(queries);
    query.response(responses[step - 1]);
  });
};

export { stubQueries };
