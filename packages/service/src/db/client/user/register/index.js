import { User as UserType } from '@boilerplate-monorepo/common';
import { Models } from 'models';

const register = async user => {
  const dbUser = UserType.apiToDb(user);

  await Models.User.forge(dbUser).save(null, { method: 'insert' });

  return true;
};

export { register };
