import { UserRecovery } from '@boilerplate-monorepo/common';
import { pipe } from 'ramda';
import { userReadRaw } from './userReadRaw';

const userRecoveryFind = async (
  { email, id, includeDeleted, username },
  context
) => {
  const user = await userReadRaw(
    { email, id, includeDeleted, username },
    context
  );

  return pipe(UserRecovery.dbToApi, UserRecovery.apiToMasked)(user);
};

export { userRecoveryFind };
