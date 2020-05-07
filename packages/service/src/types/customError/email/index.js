import { ApolloError } from 'apollo-server-express';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = error => {
  error.message = PublicErrorMessage.EMAIL_SEND_FAILED;

  return error;
};

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class EmailSendError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.EMAIL_SEND_FAILED,
      ErrorType.EMAIL_SEND_ERROR,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: EmailSendError.name });
  }
}

export { EmailSendError };
