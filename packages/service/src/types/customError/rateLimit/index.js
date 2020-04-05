import { ApolloError } from 'apollo-server-express';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

class RateLimitError extends ApolloError {
  constructor(msBeforeNextReset) {
    super(
      PublicErrorMessage.RATE_LIMIT_EXCEEDED,
      ErrorType.RATE_LIMIT_EXCEEDED,
      {
        message: `Please wait another ${Math.ceil(
          msBeforeNextReset / 1000
        )} second(s) before retrying`,
      }
    );

    Object.defineProperty(this, 'name', { value: RateLimitError.name });
  }
}
export { RateLimitError };
