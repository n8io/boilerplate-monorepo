import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  MAIN: 'main',
  NAVIGATION: 'navigation',
};

const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
