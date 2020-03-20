import { pick } from 'ramda';

const makeInitial = pick(['email', 'username']);

export { makeInitial };
