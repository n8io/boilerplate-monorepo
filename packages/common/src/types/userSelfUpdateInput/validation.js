import { ErrorKeys as PasswordErrorKeys } from '../../constants/password';
import {
  ErrorKeys as UserErrorKeys,
  REGEX as USERNAME_REGEX,
} from '../../constants/user';
import { regexToInputPattern } from '../utils/regexToInputPattern';
import { Validation } from '../validation';

const { object, string } = Validation;

const Limits = {
  email: {
    max: 250,
    min: 3,
    required: true,
  },
  username: {
    max: 50,
    min: 4,
    pattern: regexToInputPattern(USERNAME_REGEX),
    required: true,
  },
};

const validationSchema = object().shape({
  email: string()
    .email()
    .required()
    .limits(Limits.email),
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
