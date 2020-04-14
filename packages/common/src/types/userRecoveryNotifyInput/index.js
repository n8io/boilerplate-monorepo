import { makeInitial } from './creation';
import { apiExample, uiExample } from './examples';
import { Enumeration, propTypes } from './typedef';
import { isValid, validationSchema } from './validation';

const UserRecoveryNotifyInput = {
  ...Enumeration,
  apiExample,
  isValid,
  makeInitial,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserRecoveryNotifyInput };
