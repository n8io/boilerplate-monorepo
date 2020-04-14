import { ApolloError } from 'apollo-server-express';
import { toSafeLog } from 'log/toSafeLog';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = toSafeLog;

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class DatabaseError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.DATABASE_ERROR_OCCURRED,
      ErrorType.DATABASE_ERROR_OCCURRED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: DatabaseError.name });
  }
}

export { DatabaseError };
