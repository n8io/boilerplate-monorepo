import { initial } from './creation';
import { apiExample, uiExample } from './examples';
import { formToInput } from './transforms';
import { propTypes } from './typedef';
import { ErrorKeys, isValid, Limits, validationSchema } from './validation';

const UserSelfSecurityUpdateInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  initial,
  isValid,
  propTypes,
  uiExample,
  validationSchema,
};

export { UserSelfSecurityUpdateInput };
