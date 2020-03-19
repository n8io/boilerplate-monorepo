import { defaultTo, nth, pipe, split, toString } from 'ramda';

const regexToInputPattern = pipe(
  toString,
  defaultTo('/.*/'),
  split('/'),
  nth(1)
);

export { regexToInputPattern };
