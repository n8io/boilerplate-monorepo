import { User } from '@boilerplate-monorepo/common';
import { isNil, map, reject } from 'ramda';
import { readRaw } from '../readRaw';

const readPaginated = async ({ after, first } = {}) => {
  const input = {
    after,
    first,
    includeDeleted: false,
  };

  const { pagination, users: usersRaw } = await readRaw(reject(isNil, input));
  const users = map(User.dbToApi, usersRaw);

  return { pagination, users };
};

export { readPaginated };
