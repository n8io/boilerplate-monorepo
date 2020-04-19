import { Time } from '@boilerplate-monorepo/common';
import { config } from 'config';
import { always, evolve, identity, map } from 'ramda';

const { isDev } = config;

const thirtySeconds = 30;
const oneMinute = 60;
const fiveMinutes = Time.minutesToSeconds(5);
const fifteenMinutes = Time.minutesToSeconds(15);
const thirtyMinutes = Time.minutesToSeconds(30);
const noLimit = { duration: 1, limit: 999 };
const unlimited = { burst: noLimit, window: noLimit };

const toUnlimited = evolve({
  burst: always(unlimited.burst),
  duration: always(noLimit.duration),
  limit: always(noLimit.limit),
  window: always(unlimited.window),
});

const applyDebugLimits = isDev ? toUnlimited : identity;

const rateLimits = {
  USER_ACCOUNT_RECOVERY_CODE_VERIFY: {
    burst: { duration: thirtySeconds, limit: 3 },
    window: { duration: fiveMinutes, limit: 10 },
  },
  USER_ACCOUNT_RECOVERY_FIND: {
    burst: { duration: thirtySeconds, limit: 10 },
    window: { duration: fiveMinutes, limit: 50 },
  },
  USER_ACCOUNT_RECOVERY_NOTIFY: {
    burst: { duration: thirtySeconds, limit: 1 },
    window: { duration: fiveMinutes, limit: 2 },
  },
  USER_LOGIN: {
    burst: { duration: thirtySeconds, limit: 10 },
    window: { duration: fifteenMinutes, limit: 50 },
  },
  USER_LOGIN_USERNAME: {
    duration: thirtySeconds,
    limit: 5,
  },
  USER_LOGOUT: {
    burst: { duration: fiveMinutes, limit: 100 },
  },
  USER_PASSWORD_RESET: {
    burst: { duration: thirtySeconds, limit: 2 },
    window: { duration: fifteenMinutes, limit: 10 },
  },
  USER_PASSWORD_RESET_VALIDATE: {
    burst: { duration: thirtySeconds, limit: 2 },
    window: { duration: fifteenMinutes, limit: 10 },
  },
  USER_REGISTER: {
    burst: { duration: oneMinute, limit: 1 },
    window: { duration: thirtyMinutes, limit: 10 },
  },
};

const Enumeration = map(applyDebugLimits, rateLimits);

export { Enumeration };
