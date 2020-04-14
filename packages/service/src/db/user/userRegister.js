import { User } from '@boilerplate-monorepo/common';

const userRegister = async (user, context) => {
  const { User: UserModel } = context.Models;
  const { id, ...rest } = User.apiToDb(user);

  await new UserModel({ id }).save(rest, { method: 'insert' });

  return true;
};

export { userRegister };
