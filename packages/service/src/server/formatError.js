import { config } from 'config';
import { path } from 'ramda';

const toSafeError = (error) => {
  const code = path(['extensions', 'code'], error);

  if (code && code.match(/[:]/giu)) {
    const [errorCode] = code.split(':');

    error.extensions.code = errorCode;
  }

  const { isDev } = config;

  if (!isDev) {
    error.extensions && delete error.extensions.exception;
  }

  return error;
};

const formatError = (error) => {
  let newError = error;
  const { extensions } = error;

  if (extensions?.toSafeError) {
    newError = extensions.toSafeError(error);
  }

  return toSafeError(newError);
};

export { formatError };
