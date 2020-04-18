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

class UserRevokeRefreshTokensError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.USER_REVOKE_REFRESH_TOKENS_FAILED,
      ErrorType.FAILED_TO_REVOKE_USER_REFRESH_TOKENS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserRevokeRefreshTokensError.name,
    });
  }
}

export { UserRevokeRefreshTokensError };
