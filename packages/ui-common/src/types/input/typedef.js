import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  CHECKBOX: 'checkbox',
  COLOR: 'color',
  EMAIL: 'email',
  FILE: 'file',
  HIDDEN: 'hidden',
  NUMBER: 'number',
  PASSWORD: 'password',
  RADIO: 'radio',
  RANGE: 'range',
  SEARCH: 'search',
  SUBMIT: 'submit',
  TELEPHONE: 'tel',
  TEXT: 'text',
  URL: 'url',
};

export const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
