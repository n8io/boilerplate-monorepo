const R = require('ramda');
const findMutation = require('./findMutation');
const findQuery = require('./findQuery');
const tabs = require('./tabs');

const toArg = ({ name }) => `${name}: $${name}`;

const toFormattedArgs = args => {
  if (R.isEmpty(args)) return '';

  const inputLines = R.map(toArg, args);
  const isMultiLine = inputLines.length > 1;

  if (!isMultiLine) {
    return `(${R.head(inputLines)})`;
  }

  const parameters = R.pipe(
    R.map(arg => `${tabs(3)}${arg}`),
    R.join(`,\n`)
  )(inputLines);

  const lines = ['(', parameters, `${tabs(2)})`];

  return R.join('\n', lines);
};

const toArgs = name => {
  const query = findQuery(name) || findMutation(name);

  return toFormattedArgs(query.args);
};

module.exports = toArgs;
