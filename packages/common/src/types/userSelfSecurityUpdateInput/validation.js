import { mergeRight, pick, pipe } from 'ramda';
import { UserRegisterInput } from 'types/userRegisterInput';
import { ErrorKeys as PasswordErrorKeys } from '../../constants/password';
import { Validation } from '../validation';

const { object, string } = Validation;

const passwordCurrent = pick(
  ['min', 'required'],
  UserRegisterInput.Limits.passwordNew
);

const Limits = pipe(
  pick(['passwordConfirm', 'passwordNew']),
  mergeRight({
    passwordCurrent,
  })
)(UserRegisterInput.Limits);

const validationSchema = UserRegisterInput.validationSchemaPassword.concat(
  object().shape({
    passwordCurrent: string()
      .trim()
      .required()
      .limits(Limits.passwordNew),
  })
);

const isValid = validationSchema.isValid.bind(validationSchema);

const ErrorKeys = PasswordErrorKeys;

export { ErrorKeys, Limits, isValid, validationSchema };
