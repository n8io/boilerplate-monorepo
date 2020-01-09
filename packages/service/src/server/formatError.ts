import 'dotenv/config';
import { GraphQLError } from 'graphql';

const toSafeError = (error: GraphQLError) => {
  const { extensions } = error;

  if (extensions!.code.match(/[:]/giu)) {
    const errorCode = extensions!.code.split(':')[0] as string;

    error.extensions!.code = errorCode;
  }

  if (process.env.NODE_ENV !== 'development') {
    delete error.extensions!.exception;
  }

  return error;
};

const formatError = (error: GraphQLError) => {
  let newError = error;
  const { extensions } = error;

  if (extensions!.toSafeError) {
    newError = extensions!.toSafeError(error);
  }

  return toSafeError(newError);
};

export { formatError };
