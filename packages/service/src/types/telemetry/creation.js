import * as Sentry from '@sentry/node';
import { config } from 'config';
import { Source, Tag } from './typedef';

const init = () => {
  const { RELEASE, SENTRY_DSN, environment, isTelemetryEnabled } = config;

  if (!isTelemetryEnabled) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment,
    release: RELEASE,
  });

  Sentry.configureScope((scope) => {
    scope.setTag(Tag.SOURCE, Source.SERVICE);
  });
};

export { init };
