import { oneOf } from 'prop-types';
import { values as ramdaValues } from 'ramda';

export const Enumeration = {
  DEFAULT: 'DEFAULT',
  LINK: 'LINK',
  MENU_ITEM: 'MENU_ITEM',
  PRIMARY: 'PRIMARY',
};

export const values = ramdaValues(Enumeration);

export const propTypes = oneOf(values);
