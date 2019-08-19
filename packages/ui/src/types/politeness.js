import { oneOf } from 'prop-types';
import { values } from 'ramda';

export const Politeness = {
  ASSERTIVE: 'assertive',
  POLITE: 'polite',
};

export const propTypes = oneOf(values(Politeness));
