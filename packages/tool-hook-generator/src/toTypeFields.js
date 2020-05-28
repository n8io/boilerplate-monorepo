const R = require('ramda');
const schema = require('../../../.graphql/schema.json');
const findMutation = require('./findMutation');
const findQuery = require('./findQuery');
const tabs = require('./tabs');

const alphasort = R.sort((a, b) => a.localeCompare(b));

const toFormatted = (fields, level) => {
  const lines = R.map((field) => `${tabs(level * 3)}${field}`, fields);

  return ` {\n${R.join('\n', lines)}\n${tabs(level * 3 - 1)}}`;
};

const toTypeFields = (name, level = 1) => {
  const query = findQuery(name) || findMutation(name);

  const isScalar = R.either(
    R.pathEq(['type', 'ofType', 'kind'], 'SCALAR', query),
    R.pathEq(['type', 'kind'], 'SCALAR', query)
  );

  if (isScalar) return '';

  const returnType = R.pathOr(
    R.path(['type', 'ofType', 'name'], query),
    ['type', 'name'],
    query
  );

  if (!returnType) return '';

  const fields = R.pipe(
    R.path(['__schema', 'types']),
    R.find(R.propEq('name', returnType)),
    R.prop('fields'),
    R.pluck('name'),
    alphasort
  )(schema);

  if (fields.length === 0) return '';

  return toFormatted(fields, level);
};

module.exports = toTypeFields;
