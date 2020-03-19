import { apiExample, uiExample } from './examples';
import { formToInput } from './transforms';
import { propTypes } from './typedef';
import { ErrorKeys, isValid, Limits, validationSchema } from './validation';

const UserSelfUpdateInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  isValid,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserSelfUpdateInput };
