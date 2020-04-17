import { User as UserType } from '@boilerplate-monorepo/common';

const userRegister = async (user, context) => {
  const { User } = context.Models;
  const { id, ...rest } = UserType.apiToDb(user);

  await new User({ id }).save(rest, { method: 'insert' });

  return true;
};

export { userRegister };
