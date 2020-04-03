import { pick } from 'ramda';

const makeInitial = pick(['email', 'familyName', 'givenName', 'username']);

export { makeInitial };
