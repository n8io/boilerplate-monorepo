import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  ALERT: 'alert',
  BANNER: 'banner',
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  DIALOG: 'dialog',
  FOOTER: 'contentinfo',
  MAIN: 'main',
  NAVIGATION: 'navigation',
};

export const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
