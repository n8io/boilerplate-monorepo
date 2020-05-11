import { Utils } from '@boilerplate-monorepo/common';
import { evolve, isNil, pick, pipe, unless } from 'ramda';

const userToLog = unless(isNil, pick(['email', 'id', 'role', 'username']));

const contextToLog = unless(
  isNil,
  pipe(
    pick(['ip', 'requestId', 'user']),
    Utils.renameKeys({ ip: 'ip_address' }),
    evolve({ user: userToLog })
  )
);

export { contextToLog, userToLog };
