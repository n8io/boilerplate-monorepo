import { parseISO } from 'date-fns/fp';
import { isNil, unless } from 'ramda';

const apiToUi = unless(isNil, parseISO);

export { apiToUi };
