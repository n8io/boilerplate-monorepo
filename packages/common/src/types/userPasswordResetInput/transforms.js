import { omit } from 'ramda';

const formToInput = omit(['passwordConfirm']);

export { formToInput };
