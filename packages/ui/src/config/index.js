const DEVELOPMENT_PREFIX = 'dev';
const PRODUCTION_PREFIX = 'prod';
const DEBUG_KEY = 'debug';

// eslint-disable-next-line no-process-env
const { NODE_ENV = PRODUCTION_PREFIX } = process.env;

const config = {
  NODE_ENV,
  isDebug: Boolean(localStorage.getItem(DEBUG_KEY)),
  isDevelopment: NODE_ENV.startsWith(DEVELOPMENT_PREFIX),
  isProduction: NODE_ENV.startsWith(PRODUCTION_PREFIX),
};

export { config };
