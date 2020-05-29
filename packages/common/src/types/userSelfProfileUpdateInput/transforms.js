import { pick } from 'ramda';

const formToInput = pick(['email', 'familyName', 'givenName']);

export { formToInput };
