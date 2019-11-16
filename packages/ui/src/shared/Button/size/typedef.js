import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  DEFAULT: 'DEFAULT',
  LARGE: 'LARGE',
  SMALL: 'SMALL',
};

export const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
