import {
  ErrorKeys as PasswordErrorKeys,
  REGEX as STRONG_PASSWORD_REGEX,
} from '../../constants/password';
import {
  ErrorKeys as UserErrorKeys,
  REGEX as USERNAME_REGEX,
} from '../../constants/user';
import { regexToInputPattern } from '../utils/regexToInputPattern';
import { Validation } from '../validation';

const { object, ref, string } = Validation;

const passwordNew = {
  min: 8,
  pattern: regexToInputPattern(STRONG_PASSWORD_REGEX),
  required: true,
};

const Limits = {
  email: {
    max: 250,
    min: 3,
    required: true,
  },
  familyName: {
    max: 50,
    min: 2,
    required: true,
  },
  givenName: {
    max: 50,
    min: 2,
    required: true,
  },
  passwordConfirm: passwordNew,
  passwordNew,
  username: {
    max: 50,
    min: 4,
    pattern: regexToInputPattern(USERNAME_REGEX),
    required: true,
  },
};

const validationSchemaPassword = object().shape({
  passwordConfirm: string()
    .trim()
    .required()
    .oneOf(
      [ref('passwordNew'), null],
      PasswordErrorKeys.CONFIRM_PASSWORD_MISMATCH
    ),
  passwordNew: string()
    .trim()
    .required()
    .limits(Limits.passwordNew)
    .matches(
      Limits.passwordNew.pattern,
      PasswordErrorKeys.DOES_NOT_MEET_PASSWORD_REQUIREMENTS
    ),
});

const validationSchemaSettings = object().shape({
  email: string()
    .email()
    .required()
    .limits(Limits.email),
  familyName: string()
    .trim()
    .required()
    .limits(Limits.familyName),
  givenName: string()
    .trim()
    .required()
    .limits(Limits.givenName),
});

const validationSchema = validationSchemaPassword
  .concat(validationSchemaSettings)
  .concat(
    object().shape({
      username: string()
        .trim()
        .required()
        .limits(Limits.username)
        .matches(
          Limits.username.pattern,
          UserErrorKeys.DOES_NOT_MEET_USERNAME_REQUIREMENTS
        ),
    })
  );

const isValid = validationSchema.isValid.bind(validationSchema);

const ErrorKeys = {
  ...PasswordErrorKeys,
  ...UserErrorKeys,
};

export {
  ErrorKeys,
  Limits,
  isValid,
  validationSchema,
  validationSchemaPassword,
  validationSchemaSettings,
};
