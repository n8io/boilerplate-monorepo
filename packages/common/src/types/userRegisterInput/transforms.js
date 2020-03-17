import { omit } from 'ramda';

const formToInput = omit(['confirmPassword']);

export { formToInput };
