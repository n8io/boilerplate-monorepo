import { UserRole } from 'types/userRole';
import { Utils } from 'utils';

const dbExample = Utils.makeSafeExample({
  email: 'EMAIL',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  id: 'ID',
  role: UserRole.USER,
  username: 'USERNAME',
});

const apiExample = Utils.makeSafeExample(dbExample());

const uiExample = Utils.makeSafeExample(apiExample());

export { apiExample, dbExample, uiExample };
