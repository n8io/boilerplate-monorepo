import { Time } from '@boilerplate-monorepo/common';

const thirtySeconds = 30;
const oneMinute = 60;
const fiveMinutes = Time.minutesToSeconds(5);
const fifteenMinutes = Time.minutesToSeconds(15);
const thirtyMinutes = Time.minutesToSeconds(30);

const Map = {
  USER_LOGIN: {
    burst: { duration: thirtySeconds, limit: 10 },
    window: { duration: fifteenMinutes, limit: 50 },
  },
  USER_LOGOUT: {
    burst: { duration: fiveMinutes, limit: 100 },
  },
  USER_REGISTER: {
    burst: { duration: oneMinute, limit: 1 },
    window: { duration: thirtyMinutes, limit: 10 },
  },
};

export { Map };
