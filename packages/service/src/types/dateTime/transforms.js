import { isDate, parseISO, toDate } from 'date-fns/fp';
import { always, cond, identity, is, isNil, T } from 'ramda';

const toSafeDate = cond([
  [isNil, identity],
  [isDate, toDate],
  [is(String), parseISO],
  [is(Number), toDate],
  [T, always(null)],
]);

export { toSafeDate };
