import { oneOf, shape, string } from 'prop-types';
import { values as ramdaValues } from 'ramda';

const Enumeration = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
};

const values = ramdaValues(Enumeration);

const propTypes = shape({
  id: string.isRequired,
  notificationMethod: oneOf(values).isRequired,
});

export { Enumeration, propTypes, values };
