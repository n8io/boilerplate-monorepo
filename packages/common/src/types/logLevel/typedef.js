import { oneOf } from 'prop-types';

const Enumeration = {
  ERROR: 'ERROR',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARN: 'WARN',
};

const values = Object.values(Enumeration);

const propTypes = oneOf(values);

export { Enumeration, propTypes, values };
