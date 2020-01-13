import { User } from 'entity/User';
import { UserContext } from 'types/userContext';
import { pick, pipe, evolve, always } from 'ramda';

const toSafeLog = (user: User | UserContext) =>
  pipe(
    pick(['email', 'id', 'password', 'passwordHash', 'username']),
    evolve({
      password: always('<redacted>'),
      passwordHash: always('<redacted>'),
    })
  )(user) as User;

export { toSafeLog };
