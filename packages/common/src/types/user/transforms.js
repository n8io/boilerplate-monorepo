import { both, evolve, omit, pipe, prop, toLower, unless, when } from 'ramda';
import { UnsafeProps } from 'types/unsafeProps';
import { Utils } from 'utils';
import { renameKeys } from 'utils/renameKeys';

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

const properCase = renameKeys({
  /* eslint-disable camelcase */
  created_at: 'createdAt',
  deleted_at: 'deletedAt',
  deleted_by: 'deletedBy',
  family_name: 'familyName',
  given_name: 'givenName',
  password_hash: 'passwordHash',
  password_reset_token: 'passwordResetToken',
  password_reset_token_expiration: 'passwordResetTokenExpiration',
  token_version: 'tokenVersion',
  /* eslint-enable camelcase */
});

const toSafeProps = omit(UnsafeProps);

const removeDbOnlyProps = omit([
  'created_at',
  'deleted_at',
  'deleted_by',
  'name',
  'tokenVersion',
  'updated_at',
]);

const dbToApi = unless(
  Utils.isNullOrEmpty,
  pipe(toSafeProps, removeDbOnlyProps, properCase)
);

export { apiToDb, dbToApi };
