import { Db } from 'types/db';

const userRegister = async (user, context) => {
  const { User } = context.Models;
  const { id, ...rest } = Db.apiToDb(user);

  await new User({ id }).save(rest, { method: 'insert' });

  return true;
};

export { userRegister };
