import { User } from '@boilerplate-monorepo/common';
import { userReadRaw } from './userReadRaw';

const userRead = async ({ email, id, includeDeleted, username }, context) => {
  const user = await userReadRaw(
    { email, id, includeDeleted, username },
    context
  );

  return User.dbToApi(user);
};

export { userRead };
