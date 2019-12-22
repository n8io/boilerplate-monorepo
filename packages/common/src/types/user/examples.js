import { makeSafeExample } from '../utils/makeSafeExample';

const dbExample = makeSafeExample({
  email: 'EMAIL',
  familyName: 'FAMILY_NAME',
  givenName: 'GIVEN_NAME',
  id: 'ID',
  username: 'USERNAME',
});

const apiExample = makeSafeExample(dbExample());

const uiExample = makeSafeExample(apiExample());

export { uiExample };
