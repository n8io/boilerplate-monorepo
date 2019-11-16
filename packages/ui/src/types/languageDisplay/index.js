import { values as ramdaValues } from 'ramda';
import { Enumeration } from './typedef';

export const LanguageDisplay = {
  ...Enumeration,
};

export const values = ramdaValues(Enumeration);
