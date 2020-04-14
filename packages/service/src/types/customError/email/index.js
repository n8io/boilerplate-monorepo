import { ApolloError } from 'apollo-server-express';
import { toSafeLog } from 'log/toSafeLog';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = toSafeLog;

const appendSafeError = props => ({
  ...props,
  toSafeError,
});

class EmailError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.FAILED_TO_SEND_OTP_EMAIL,
      ErrorType.FAILED_TO_SEND_OTP_EMAIL,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: EmailError.name });
  }
}

export { EmailError };
