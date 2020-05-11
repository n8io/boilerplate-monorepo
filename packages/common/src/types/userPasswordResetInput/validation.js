import { UserRegisterInput } from 'types/userRegisterInput';
import { ErrorKeys as PasswordErrorKeys } from '../../constants/password';
import { ErrorKeys as UserErrorKeys } from '../../constants/user';
import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  passwordConfirm: UserRegisterInput.Limits.passwordNew,
  passwordNew: UserRegisterInput.Limits.passwordNew,
};

const validationSchemaServer = UserRegisterInput.validationSchemaPassword.concat(
  object().shape({
    id: string().trim().required(),
    token: string().trim().required(),
  })
);

const validationSchema = validationSchemaServer.concat(
  UserRegisterInput.validationSchemaConfirmPassword
);

const isValid = validationSchema.isValid.bind(validationSchema);

const ErrorKeys = {
  ...PasswordErrorKeys,
  ...UserErrorKeys,
};

export { ErrorKeys, Limits, isValid, validationSchema, validationSchemaServer };
