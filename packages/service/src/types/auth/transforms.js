import { always, evolve, pick, pipe } from 'ramda';

const toSafeLog = user =>
  pipe(
    pick(['email', 'id', 'password', 'passwordHash', 'username']),
    evolve({
      password: always('<redacted>'),
      passwordHash: always('<redacted>'),
    })
  )(user);

export { toSafeLog };
