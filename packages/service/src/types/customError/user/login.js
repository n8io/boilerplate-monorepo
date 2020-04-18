import { ApolloError } from 'apollo-server-express';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  delete error.extensions.deleted_at;
  delete error.extensions.username;

  error.message = PublicErrorMessage.LOGIN_FAILED;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserInvalidLoginError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.LOGIN_FAILED,
      ErrorType.FAILED_LOGIN,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserInvalidLoginError.name });
  }
}

class UserInvalidLoginUserNotFoundError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_NOT_FOUND,
      ErrorType.FAILED_LOGIN_USER_NOT_FOUND,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginUserNotFoundError.name,
    });
  }
}

class UserInvalidLoginPasswordMismatchError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.PASSWORD_MISMATCH,
      ErrorType.FAILED_LOGIN_PASSWORD_MISMATCH,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginPasswordMismatchError.name,
    });
  }
}

class UserInvalidLoginUserDeletedError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_IS_DELETED,
      ErrorType.FAILED_LOGIN_USER_DELETED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginUserDeletedError.name,
    });
  }
}

export {
  UserInvalidLoginError,
  UserInvalidLoginUserNotFoundError,
  UserInvalidLoginPasswordMismatchError,
  UserInvalidLoginUserDeletedError,
};
