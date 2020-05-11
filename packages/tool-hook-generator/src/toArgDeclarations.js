const R = require('ramda');
const findMutation = require('./findMutation');
const findQuery = require('./findQuery');
const tabs = require('./tabs');

const toArgDeclaration = ({ name, type }) => {
  const { kind, ofType } = type;
  const { name: typename } = ofType;
  const isNullable = kind !== 'NON_NULL';

  return `$${name}: ${typename}${isNullable ? '' : '!'}`;
};

const toFormattedArgs = (args) => {
  if (R.isEmpty(args)) return '';

  const inputLines = R.map(toArgDeclaration, args);
  const isMultiLine = inputLines.length > 1;

  if (!isMultiLine) {
    return `(${R.head(inputLines)})`;
  }

  const declarations = R.pipe(
    R.map((arg) => `${tabs(2)}${arg}`),
    R.join(`,\n`)
  )(inputLines);

  const lines = ['(', declarations, `${tabs(1)})`];

  return R.join('\n', lines);
};

const toArgDeclarations = (name) => {
  const query = findQuery(name) || findMutation(name);

  return toFormattedArgs(query.args);
};

module.exports = toArgDeclarations;
