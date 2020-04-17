import { Utils } from '@boilerplate-monorepo/common';
import { map, pipe, unless } from 'ramda';

const unsafeProps = [
  'captchaToken',
  'clearTextPassword',
  'password_confirm',
  'password_current',
  'password_hash',
  'password_new',
  'password',
  'passwordConfirm',
  'passwordCurrent',
  'passwordHash',
  'passwordNew',
  'passwordResetToken',
  'recoveryCode',
  'recoveryCodeExpiration',
  'recoveryCodeSecret',
  'token',
];

const toSafeLog = unless(
  Utils.isNullOrEmpty,
  pipe(...map(Utils.redactPropDeep, unsafeProps), JSON.stringify)
);

export { toSafeLog };
