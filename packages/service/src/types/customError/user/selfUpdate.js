import { ApolloError } from 'apollo-server-express';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  delete error.extensions.email;
  delete error.extensions.username;

  error.message = PublicErrorMessage.FAILED_TO_UPDATE_SELF;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class UserSelfUpdateNotFoundError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.FAILED_TO_UPDATE_SELF_NOT_FOUND,
      ErrorType.FAILED_TO_UPDATE_SELF,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfUpdateNotFoundError.name,
    });
  }
}

export { UserSelfUpdateNotFoundError };
