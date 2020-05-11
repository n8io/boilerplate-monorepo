import { includes, is, pipe, toLower, toString, unless, __ } from 'ramda';

const toBool = (value) =>
  value
    ? pipe(
        unless(is(String), toString),
        toLower,
        includes(__, ['true', '1'])
      )(value)
    : false;

export { toBool };
