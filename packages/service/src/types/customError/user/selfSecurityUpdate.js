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

class UserSelfSecurityUpdateMismatchError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.PASSWORD_MISMATCH,
      ErrorType.FAILED_LOGIN_PASSWORD_MISMATCH,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfSecurityUpdateMismatchError.name,
    });
  }
}

export { UserSelfSecurityUpdateMismatchError };
