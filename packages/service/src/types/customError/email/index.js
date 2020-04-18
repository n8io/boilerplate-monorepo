import { ApolloError } from 'apollo-server-express';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  error.message = PublicErrorMessage.EMAIL_PASSWORD_RESET_SEND_FAILED;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class EmailError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.EMAIL_PASSWORD_RESET_SEND_FAILED,
      ErrorType.EMAIL_PASSWORD_RESET_SEND_FAILED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: EmailError.name });
  }
}

export { EmailError };
