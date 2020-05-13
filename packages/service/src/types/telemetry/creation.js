import * as Sentry from '@sentry/node';
import { config } from 'config';
import { Source, Tag } from './typedef';

const init = () => {
  const {
    SENTRY_DSN,
    environment,
    isDev,
    isTelemetryEnabled,
    version,
  } = config;

  if (!isTelemetryEnabled) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment,
    release: isDev ? `unreleased` : version,
  });

  Sentry.configureScope((scope) => {
    scope.setTag(Tag.SOURCE, Source.SERVICE);
  });
};

export { init };
