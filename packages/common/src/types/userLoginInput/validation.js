import {
  ErrorKeys as PasswordErrorKeys,
  REGEX as STRONG_PASSWORD_REGEX,
} from '../../constants/password';
import {
  ErrorKeys as UserErrorKeys,
  REGEX as USERNAME_REGEX,
} from '../../constants/user';
import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  password: {
    min: 8,
    pattern: STRONG_PASSWORD_REGEX,
    required: true,
  },
  username: {
    max: 50,
    min: 4,
    pattern: USERNAME_REGEX,
    required: true,
  },
};

const validationSchema = object().shape({
  password: string()
    .trim()
    .required()
    .limits(Limits.password)
    .matches(
      Limits.password.pattern,
      PasswordErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS
    ),
  username: string()
    .trim()
    .required()
    .limits(Limits.username)
    .matches(
      Limits.username.pattern,
      UserErrorKeys.DOES_NOT_MEET_USERNAME_REQUIREMENTS
    ),
});

const isValid = validationSchema.isValid.bind(validationSchema);

const ErrorKeys = {
  ...PasswordErrorKeys,
  ...UserErrorKeys,
};

export { ErrorKeys, Limits, isValid, validationSchema };
