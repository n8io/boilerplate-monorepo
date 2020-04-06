import { pick } from 'ramda';

const formToInput = pick(['passwordCurrent', 'passwordNew']);

export { formToInput };
