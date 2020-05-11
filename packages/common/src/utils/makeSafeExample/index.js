import ExtendableError from 'es6-error';
import {
  both,
  difference,
  is,
  isEmpty,
  join,
  keys,
  mergeWith,
  none,
} from 'ramda';

class ExampleError extends ExtendableError {}

const validateKeys = (defaults, overrides) => {
  const invalidKeys = difference(keys(overrides), keys(defaults));

  if (!isEmpty(invalidKeys)) {
    throw new ExampleError(
      `Unrecognized prop(s) in example overrides: ${join(', ', invalidKeys)}`
    );
  }
};

const unmergeableTypes = [Array, Date, Function];

const isMergeable = (obj) => none((type) => is(type, obj), unmergeableTypes);

const isPlainObject = both(is(Object), isMergeable);

const safeMerge = (defaults, overrides) => {
  if (isPlainObject(defaults) && isPlainObject(overrides)) {
    validateKeys(defaults, overrides);
    return mergeWith(safeMerge, defaults, overrides);
  }

  return overrides;
};

const makeSafeExample = (defaults) => (overrides = {}) =>
  safeMerge(is(Function, defaults) ? defaults(overrides) : defaults, overrides);

export { ExampleError, makeSafeExample };
