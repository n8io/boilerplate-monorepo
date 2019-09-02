import { defaultTo, filter, fromPairs, keys, map, pipe } from 'ramda';
import { LocalStorage } from 'types/localStorage';

const DEVELOPMENT_PREFIX = 'dev';
const PRODUCTION_PREFIX = 'prod';

const { NODE_ENV = PRODUCTION_PREFIX, ...envVars } = process.env;

const REACT_APP_PREFIX = 'REACT_APP_';

const reactVars = pipe(
  keys,
  filter(key => key.toString().startsWith(REACT_APP_PREFIX)),
  map(key => [key.replace(REACT_APP_PREFIX, ''), envVars[key]]),
  fromPairs,
  ({ SENTRY_ENV, ...rest }) => ({
    ...rest,
    SENTRY_ENV: defaultTo(NODE_ENV, SENTRY_ENV),
  })
)(envVars);

const config = {
  ...reactVars,
  NODE_ENV,
  isDebug: Boolean(localStorage.getItem(LocalStorage.DEBUG)),
  isDevelopment: NODE_ENV.startsWith(DEVELOPMENT_PREFIX),
  isProduction: NODE_ENV.startsWith(PRODUCTION_PREFIX),
};

export { config };
