import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  BUTTON: 'button',
  SUBMIT: 'submit',
};

export const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
