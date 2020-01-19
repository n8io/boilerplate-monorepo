const R = require('ramda');
const schema = require('../.codegen/schema.json');

const findMutation = name =>
  R.pipe(
    R.path(['__schema', 'types']),
    R.find(R.propEq('name', 'Mutation')),
    R.prop('fields'),
    R.find(R.propEq('name', name))
  )(schema);

module.exports = findMutation;
