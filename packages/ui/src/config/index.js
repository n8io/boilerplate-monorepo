const PRODUCTION_PREFIX = 'prod';

// eslint-disable-next-line no-process-env
const { NODE_ENV = PRODUCTION_PREFIX } = process.env;

const config = {
  NODE_ENV,
  isProduction: NODE_ENV.startsWith(PRODUCTION_PREFIX),
};

export { config };
