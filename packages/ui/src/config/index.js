import { LocalStorage } from '@boilerplate-monorepo/ui-common';
import {
  both,
  defaultTo,
  filter,
  fromPairs,
  keys,
  map,
  pipe,
  prop,
} from 'ramda';

const DEVELOPMENT_PREFIX = 'dev';
const PRODUCTION_PREFIX = 'prod';
const TEST_PREFIX = 'test';

// eslint-disable-next-line no-process-env
const { NODE_ENV = PRODUCTION_PREFIX, ...envVars } = process.env;

const REACT_APP_PREFIX = 'REACT_APP_';

const reactVars = pipe(
  keys,
  filter(key => key.toString().startsWith(REACT_APP_PREFIX)),
  map(key => [key.replace(REACT_APP_PREFIX, ''), envVars[key]]),
  fromPairs,
  ({ PUBLIC_URL, SENTRY_ENV, ...rest }) => ({
    ...rest,
    PUBLIC_URL: defaultTo('/', PUBLIC_URL),
    SENTRY_ENV: defaultTo(NODE_ENV, SENTRY_ENV),
  })
)(envVars);

const config = {
  ...reactVars,
  NODE_ENV,
  copyrightYear: 2019,
  isDebug: Boolean(localStorage.getItem(LocalStorage.DEBUG)),
  isDevelopment: NODE_ENV.startsWith(DEVELOPMENT_PREFIX),
  isProduction: NODE_ENV.startsWith(PRODUCTION_PREFIX),
  isTelemetryEnabled: both(
    prop('LOGROCKET_APP_ID'),
    prop('SENTRY_DSN')
  )(reactVars),
  isTest: NODE_ENV.startsWith(TEST_PREFIX),
};

window.__env = config;

export { config };
