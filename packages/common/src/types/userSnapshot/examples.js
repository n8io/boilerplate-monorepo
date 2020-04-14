import { UserRole } from 'types/userRole';
import { makeSafeExample } from '../utils/makeSafeExample';

const dbExample = makeSafeExample({
  email: 'EMAIL',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  id: 'ID',
  role: UserRole.USER,
  username: 'USERNAME',
});

const apiExample = makeSafeExample(dbExample());

const uiExample = makeSafeExample(apiExample());

export { apiExample, dbExample, uiExample };
