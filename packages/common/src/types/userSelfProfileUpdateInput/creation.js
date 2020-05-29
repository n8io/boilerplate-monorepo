import { isNil, pick, unless } from 'ramda';

const makeInitial = unless(
  isNil,
  pick(['email', 'familyName', 'givenName', 'username'])
);

export { makeInitial };
