import { apiExample, uiExample } from './examples';
import { formToInput } from './transforms';
import { propTypes } from './typedef';
import { ErrorKeys, Limits, isValid, validationSchema } from './validation';

const UserRegisterInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  isValid,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserRegisterInput };
