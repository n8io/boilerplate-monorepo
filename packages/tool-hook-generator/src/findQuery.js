const R = require('ramda');
const schema = require('../../../.graphql/schema.json');

const findQuery = name =>
  R.pipe(
    R.path(['__schema', 'types']),
    R.find(R.propEq('name', 'Query')),
    R.prop('fields'),
    R.find(R.propEq('name', name))
  )(schema);

module.exports = findQuery;
