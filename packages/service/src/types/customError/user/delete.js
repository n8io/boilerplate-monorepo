import { ApolloError } from 'apollo-server-express';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  delete error.extensions.id;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserDeleteError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.USER_DELETE_FAILED,
      ErrorType.USER_DELETE_FAILED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserDeleteError.name });
  }
}

class UserSelfDeleteError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.CANNOT_DELETE_SELF,
      ErrorType.SELF_DELETE,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserSelfDeleteError.name });
  }
}

export { UserDeleteError, UserSelfDeleteError };
