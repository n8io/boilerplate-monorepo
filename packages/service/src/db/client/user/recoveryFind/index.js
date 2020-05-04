import { UserRecovery } from '@boilerplate-monorepo/common';
import { isNil, pipe, reject } from 'ramda';
import { readRaw } from '../readRaw';

const recoveryFind = async ({ email, id, includeDeleted, username } = {}) => {
  const criteria = { email, id, includeDeleted, username };
  const user = await readRaw(reject(isNil, criteria));

  return pipe(UserRecovery.dbToApi, UserRecovery.apiToMasked)(user);
};

export { recoveryFind };
