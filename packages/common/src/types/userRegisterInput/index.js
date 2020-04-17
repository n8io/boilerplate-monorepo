import { initial } from './creation';
import { apiExample, uiExample } from './examples';
import { formToInput, inputToDb } from './transforms';
import { propTypes } from './typedef';
import {
  ErrorKeys,
  Limits,
  isValid,
  validationSchema,
  validationSchemaConfirmPassword,
  validationSchemaPassword,
  validationSchemaServer,
  validationSchemaSettings,
} from './validation';

const UserRegisterInput = {
  ErrorKeys,
  Limits,
  apiExample,
  formToInput,
  initial,
  inputToDb,
  isValid,
  propTypes,
  uiExample,
  validationSchema,
  validationSchemaConfirmPassword,
  validationSchemaPassword,
  validationSchemaServer,
  validationSchemaSettings,
};

export { UserRegisterInput };
