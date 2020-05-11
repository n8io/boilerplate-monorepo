import { Time } from '@boilerplate-monorepo/common';
import { RetryLink } from 'apollo-link-retry';

const UNAUTHORIZED = 'UNAUTHORIZED';

const link = new RetryLink({
  attempts: {
    max: 3,
    retryIf: (error) => Boolean(error) && error.statusCode !== UNAUTHORIZED,
  },
  delay: {
    initial: Time.seconds(1),
    jitter: true,
    max: Time.seconds(5),
  },
});

export { link };
