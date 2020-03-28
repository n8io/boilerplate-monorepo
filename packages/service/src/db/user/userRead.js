import { isNil, omit, unless } from 'ramda';
import { userReadRaw } from './userReadRaw';

const toSafeUser = unless(isNil, omit(['passwordHash']));

const userRead = async (input, context) => {
  const user = await userReadRaw(input, context);

  return toSafeUser(user);
};

export { userRead };
