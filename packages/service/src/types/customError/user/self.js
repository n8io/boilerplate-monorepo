import { ApolloError } from 'apollo-server-express';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  delete error.extensions.username;

  error.message = PublicErrorMessage.FAILED_TO_RETRIEVE_SELF;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserSelfDeletedError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_IS_DELETED,
      ErrorType.USER_DELETED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfDeletedError.name,
    });
  }
}

class UserSelfError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.FAILED_TO_RETRIEVE_SELF,
      ErrorType.FAILED_TO_RETRIEVE_SELF,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserSelfError.name });
  }
}

class UserSelfNotFoundError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_NOT_FOUND,
      ErrorType.FAILED_TO_RETRIEVE_SELF_USER_NOT_FOUND,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfNotFoundError.name,
    });
  }
}
export { UserSelfError, UserSelfDeletedError, UserSelfNotFoundError };
