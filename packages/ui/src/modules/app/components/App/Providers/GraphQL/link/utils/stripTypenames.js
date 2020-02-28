import { assoc, equals, is, keys, map, omit, reduce } from 'ramda';

const KEY = '__typename';
const isTypename = equals(KEY);
const isArray = is(Array);
const isObject = is(Object);
const omitTypename = omit([KEY]);

const stripTypenames = obj =>
  reduce(
    (acc, key) => {
      if (isTypename(key)) {
        return omitTypename(acc);
      }

      const childProp = obj[key];

      if (isArray(childProp)) {
        return assoc(key, map(stripTypenames, childProp), acc);
      }

      if (isObject(childProp)) {
        return assoc(key, stripTypenames(childProp), acc);
      }

      return acc;
    },
    obj,
    keys(obj)
  );

export { stripTypenames };
