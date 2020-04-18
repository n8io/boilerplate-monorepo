import { ApolloError } from 'apollo-server-express';
import { identity } from 'ramda';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = identity;

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserPasswordResetTokenMismatchError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_PASSWORD_RESET_FAILED_TOKEN_MISMATCH,
      ErrorType.USER_PASSWORD_RESET_FAILED_TOKEN_MISMATCH,
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
      PublicErrorMessage.USER_PASSWORD_RESET_FAILED,
      ErrorType.USER_PASSWORD_RESET_FAILED_TOKEN_EXPIRED,
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
