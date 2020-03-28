import { ApolloError } from 'apollo-server-express';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  delete error.extensions.email;
  delete error.extensions.username;

  error.message = PublicErrorMessage.FAILED_TO_REGISTER_USER;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class RegisterUserAlreadyExistsError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.FAILED_TO_REGISTER_USER_ALREADY_EXISTS,
      ErrorType.FAILED_TO_REGISTER_USER_ALREADY_EXISTS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: RegisterUserAlreadyExistsError.name,
    });
  }
}

class UserRegisterUserError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.FAILED_TO_REGISTER_USER,
      ErrorType.FAILED_TO_REGISTER_USER,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserRegisterUserError.name });
  }
}

export { RegisterUserAlreadyExistsError, UserRegisterUserError };
