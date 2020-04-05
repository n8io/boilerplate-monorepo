import { User } from '@boilerplate-monorepo/common';
import { map } from 'ramda';
import { usersReadRaw } from './usersReadRaw';

const usersRead = async (input, context) => {
  const { pagination, users: usersRaw } = await usersReadRaw(
    { ...input, includeDeleted: false },
    context
  );

  const users = map(User.dbToApi, usersRaw);

  return { pagination, users };
};

export { usersRead };
