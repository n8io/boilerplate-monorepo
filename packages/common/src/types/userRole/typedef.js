import { values as ramdaValues } from 'ramda';

const Enumeration = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const values = ramdaValues(Enumeration);

export { Enumeration, values };
