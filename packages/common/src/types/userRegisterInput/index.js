import { initial } from './creation';
import { apiExample, uiExample } from './examples';
import { formToInput } from './transforms';
import { propTypes } from './typedef';
import {
  ErrorKeys,
  Limits,
  isValid,
  validationSchema,
  validationSchemaPassword,
  validationSchemaSettings,
} from './validation';

const UserRegisterInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  initial,
  isValid,
  propTypes,
  uiExample,
  validationSchema,
  validationSchemaPassword,
  validationSchemaSettings,
};

export { UserRegisterInput };
