import { User } from '@boilerplate-monorepo/common';
import { isNil, reject } from 'ramda';
import { readRaw } from '../readRaw';

const read = async ({ email, id, includeDeleted, username }) => {
  const user = await readRaw(
    reject(isNil, { email, id, includeDeleted, username })
  );

  return User.dbToApi(user);
};

export { read };
