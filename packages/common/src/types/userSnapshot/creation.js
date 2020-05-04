import { pick } from 'ramda';

const make = pick([
  'email',
  'familyName',
  'givenName',
  'id',
  'role',
  'username',
]);

export { make };
