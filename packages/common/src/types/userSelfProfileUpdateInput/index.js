import { makeInitial } from './creation';
import { apiExample, uiExample } from './examples';
import { formToInput } from './transforms';
import { propTypes } from './typedef';
import { ErrorKeys, isValid, Limits, validationSchema } from './validation';

const UserSelfProfileUpdateInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  isValid,
  makeInitial,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserSelfProfileUpdateInput };
