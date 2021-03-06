import { oneOf } from 'prop-types';
import { values } from 'ramda';

export const Enumeration = {
  ASSERTIVE: 'assertive',
  POLITE: 'polite',
};

export const propTypes = oneOf(values(Enumeration));
