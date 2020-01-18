import {
  always,
  both,
  equals,
  evolve,
  head,
  ifElse,
  is,
  isEmpty,
  last,
  mergeRight,
  pipe,
  toPairs,
  when,
} from 'ramda';

const hasObjectPrototype = pipe(
  Object.getPrototypeOf,
  equals(Object.prototype)
);

const isPojo = both(is(Object), hasObjectPrototype);

const extractData = ifElse(
  isEmpty,
  always(undefined),
  pipe(toPairs, head, last)
);

const toData = pipe(
  mergeRight({ data: null }),
  evolve({
    data: when(isPojo, extractData),
  })
);

export { toData };
