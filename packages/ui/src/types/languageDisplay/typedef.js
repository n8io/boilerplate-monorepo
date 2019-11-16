import { values as ramdaValues } from 'ramda';
import { Language } from 'types/language';

export const Enumeration = {
  [Language.ENGLISH]: 'English',
  [Language.FAKE]: '𝐹åḱë',
};

export const values = ramdaValues(Enumeration);
