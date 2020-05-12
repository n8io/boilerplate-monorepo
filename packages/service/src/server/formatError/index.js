import { config } from 'config';
import { log } from 'log';
import { path } from 'ramda';
import { Telemetry } from 'types/telemetry';

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
  error?.extensions?.code === 'INTERNAL_SERVER_ERROR' &&
    log.error('An unhandled GraphQL error occurred', {
      error,
      tags: {
        [Telemetry.Tag.COMPONENT]: Telemetry.Component.FORMAT_ERROR,
        [Telemetry.Tag.MODULE]: Telemetry.Module.GRAPHQL,
      },
    });

  let newError = error;
  const { extensions } = error;

  if (extensions?.toSafeError) {
    newError = extensions.toSafeError(error);
  }

  return toSafeError(newError);
};

export { formatError };
