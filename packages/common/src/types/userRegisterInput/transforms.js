import { assoc, curry, omit, pipe } from 'ramda';

const inputToDb = curry((id, passwordHash, input) =>
  pipe(
    omit(['captchaToken', 'passwordNew']),
    assoc('id', id),
    assoc('passwordHash', passwordHash)
  )(input)
);

const formToInput = omit(['passwordConfirm']);

export { formToInput, inputToDb };
