import { both, evolve, omit, pipe, prop, toLower, unless, when } from 'ramda';
import { Utils } from 'utils';

const appendName = when(both(prop('familyName'), prop('givenName')), props => ({
  ...props,
  name: `${props.familyName},${props.givenName}`,
}));

const apiToDb = unless(
  Utils.isNullOrEmpty,
  pipe(
    appendName,
    evolve({
      email: toLower,
      name: toLower,
      username: toLower,
    })
  )
);

const toSafeProps = omit([
  'captchaToken',
  'password',
  'passwordConfirm',
  'passwordCurrent',
  'passwordHash',
  'passwordNew',
  'recoveryCode',
  'recoveryCodeExpiration',
  'recoveryCodeSecret',
]);

const dbToApi = unless(Utils.isNullOrEmpty, toSafeProps);

export { apiToDb, dbToApi };
