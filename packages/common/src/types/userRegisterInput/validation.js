import { Email } from 'types/email';
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
  email: Email.Limits,
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

const validationSchemaConfirmPassword = object().shape({
  passwordConfirm: string()
    .trim()
    .required()
    .oneOf(
      [ref('passwordNew'), null],
      PasswordErrorKeys.CONFIRM_PASSWORD_MISMATCH
    ),
});

const validationSchemaPassword = object().shape({
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
  email: Email.validationSchema,
  familyName: string()
    .trim()
    .required()
    .limits(Limits.familyName),
  givenName: string()
    .trim()
    .required()
    .limits(Limits.givenName),
});

const validationSchemaServer = validationSchemaPassword
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

const validationSchema = validationSchemaServer
  .concat(validationSchemaConfirmPassword)
  .concat(
    object().shape({
      captchaToken: string()
        .trim()
        .required(),
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
  validationSchemaConfirmPassword,
  validationSchemaPassword,
  validationSchemaServer,
  validationSchemaSettings,
};
