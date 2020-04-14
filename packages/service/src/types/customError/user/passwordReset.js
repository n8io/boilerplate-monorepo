import { ApolloError } from 'apollo-server-express';
import { toSafeLog } from 'log/toSafeLog';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = toSafeLog;

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserPasswordResetTokenMismatchError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.FAILED_TO_RESET_PASSWORD_TOKEN_MISMATCH,
      ErrorType.FAILED_TO_RESET_PASSWORD_TOKEN_MISMATCH,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserPasswordResetTokenMismatchError.name,
    });
  }
}

class UserPasswordResetTokenExpiredError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.FAILED_TO_RESET_PASSWORD,
      ErrorType.FAILED_TO_RESET_PASSWORD_TOKEN_EXPIRED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserPasswordResetTokenExpiredError.name,
    });
  }
}

export {
  UserPasswordResetTokenExpiredError,
  UserPasswordResetTokenMismatchError,
};
