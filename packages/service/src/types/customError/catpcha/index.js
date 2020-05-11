import { ApolloError } from 'apollo-server-express';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorType } from 'types/errorType';

const toSafeError = (error) => {
  error.message = PublicErrorMessage.CAPTCHA_ERROR;

  return error;
};

const appendSafeError = (props) => ({
  ...props,
  toSafeError,
});

class CaptchaError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.CAPTCHA_ERROR,
      ErrorType.CAPTCHA_ERROR,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: CaptchaError.name });
  }
}

export { CaptchaError };
