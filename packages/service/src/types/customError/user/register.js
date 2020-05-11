import { ApolloError } from 'apollo-server-express';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = (error) => {
  delete error.extensions.email;
  delete error.extensions.username;

  error.message = PublicErrorMessage.USER_REGISTER_FAILED;

  return error;
};

const appendSafeError = (props) => ({
  ...props,
  toSafeError,
});

class RegisterUserAlreadyExistsError extends ApolloError {
  constructor(properties) {
    super(
      InternalErrorMessage.USER_REGISTER_FAILED_ALREADY_EXISTS,
      ErrorType.USER_REGISTER_FAILED_ALREADY_EXISTS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: RegisterUserAlreadyExistsError.name,
    });
  }
}

export { RegisterUserAlreadyExistsError };
