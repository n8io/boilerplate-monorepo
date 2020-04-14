import { Time } from '@boilerplate-monorepo/common';
import { always, identity, map } from 'ramda';
import { ProcessEnvKeys } from 'types/processEnv';

const thirtySeconds = 30;
const oneMinute = 60;
const fiveMinutes = Time.minutesToSeconds(5);
const fifteenMinutes = Time.minutesToSeconds(15);
const thirtyMinutes = Time.minutesToSeconds(30);

// eslint-disable-next-line no-process-env
const isDebug = process.env[ProcessEnvKeys.DEBUG];

const noLimit = { duration: 1, limit: 999 };
const unlimited = { burst: noLimit, window: noLimit };

const applyDebugLimits = isDebug ? always(unlimited) : identity;

const rateLimits = {
  USER_ACCOUNT_RECOVERY_CODE_VERIFY: {
    burst: { duration: thirtySeconds, limit: 1 },
    window: { duration: fiveMinutes, limit: 2 },
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

const Map = map(applyDebugLimits, rateLimits);

export { Map };
