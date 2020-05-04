import { UserRole } from 'types/userRole';
import { Utils } from 'utils';
import { dbToApi } from './transforms';

const dbExample = Utils.makeSafeExample({
  /* eslint-disable camelcase */
  created_at: '1900-01-01T00:00:00.000Z',
  deleted_at: null,
  deleted_by: null,
  email: 'email@example.com',
  family_name: 'FAMILY_NAME',
  given_name: 'GIVEN_NAME',
  id: 'ID',
  name: 'family_name,given_name',
  password_hash: 'PASSWORD_HASH',
  password_reset_token: 'PASSWORD_RESET_TOKEN',
  password_reset_token_expiration: '2099-12-31T23:59:59Z', // Super mega future
  role: UserRole.USER,
  token_version: 1,
  username: 'username',
  /* eslint-enable camelcase */
});

const apiExample = Utils.makeSafeExample(dbToApi(dbExample()));

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, dbExample, uiExample };
