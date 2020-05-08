const R = require('ramda');
const schema = require('../../../.graphql/schema.json');
const findMutation = require('./findMutation');
const findQuery = require('./findQuery');

const toSimpleObject = typename => {
  const type = R.pipe(
    R.path(['__schema', 'types']),
    R.find(R.propEq('name', typename))
  )(schema);

  const fields = R.pipe(
    R.prop('inputFields'),
    R.map(({ defaultValue, name, type: inputType }) => {
      const dataType = R.pathOr(
        R.prop('name', inputType),
        ['ofType', 'name'],
        inputType
      );

      const isNullable = inputType.kind !== 'NON_NULL';

      return {
        defaultValue,
        isNullable,
        name,
        type: dataType,
      };
    }),
    R.map(
      ({ defaultValue, isNullable, name, type: inputType }) =>
        ` * @param ${name} - ${inputType}${isNullable ? '' : '!'}${
          defaultValue ? ` [Defaults to ${defaultValue.toString()}]` : ''
        }`
    )
  )(type);

  return [` * ${typename}`, ...fields].join('\n');
};

const toFormattedInputInfo = args => {
  if (R.isEmpty(args)) return '';

  const isInputObject = R.pathEq(['type', 'ofType', 'kind'], 'INPUT_OBJECT');
  const inputObjects = R.filter(isInputObject, args);

  if (R.isEmpty(inputObjects)) return '';

  const distinctInputTypenames = R.pipe(
    R.map(R.path(['type', 'ofType', 'name'])),
    R.uniq
  )(inputObjects);

  const typeInfos = R.map(toSimpleObject, distinctInputTypenames).join(
    '\n *\n'
  );

  return ['\n/**', typeInfos, ' */'].join('\n');
};

const toInputInfo = name => {
  const query = findQuery(name) || findMutation(name);

  return toFormattedInputInfo(query.args);
};

module.exports = toInputInfo;
