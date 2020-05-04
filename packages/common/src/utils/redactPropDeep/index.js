import { assoc, equals, is, keys, map, reduce } from 'ramda';

const REDACTION_STRING = '**********';

const isArray = is(Array);
const isObject = is(Object);

const redactPropDeep = propName => {
  const isPropNameEq = equals(propName);
  const redactProp = assoc(propName, REDACTION_STRING);

  const stripDeep = obj =>
    reduce(
      (acc, key) => {
        if (isPropNameEq(key)) {
          return redactProp(acc);
        }

        const childProp = obj[key];

        if (isArray(childProp)) {
          return assoc(key, map(stripDeep, childProp), acc);
        }

        if (isObject(childProp)) {
          return assoc(key, stripDeep(childProp), acc);
        }

        return acc;
      },
      obj,
      keys(obj)
    );

  return stripDeep;
};

export { redactPropDeep };
