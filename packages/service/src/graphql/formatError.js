const toSafeError = error => {
  const { extensions } = error;

  if (extensions && extensions.code.match(/[:]/giu)) {
    const [errorCode] = extensions.code.split(':');

    error.extensions.code = errorCode;
  }

  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV !== 'development') {
    delete error.extensions?.exception;
  }

  return error;
};

const formatError = error => {
  let newError = error;
  const { extensions } = error;

  if (extensions?.toSafeError) {
    newError = extensions?.toSafeError(error);
  }

  return toSafeError(newError);
};

export { formatError };