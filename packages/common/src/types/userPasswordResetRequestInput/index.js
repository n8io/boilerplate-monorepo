import { makeInitial } from './creation';
import { apiExample, uiExample } from './examples';
import { Enumeration, propTypes } from './typedef';
import { isValid, validationSchema } from './validation';

const UserPasswordResetRequestInput = {
  ...Enumeration,
  apiExample,
  isValid,
  makeInitial,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserPasswordResetRequestInput };
