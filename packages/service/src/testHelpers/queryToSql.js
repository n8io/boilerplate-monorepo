import { pick } from 'ramda';

const queryToSql = pick(['bindings', 'sql', 'transaction']);

export { queryToSql };
