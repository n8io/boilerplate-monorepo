import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = (error: GraphQLError) => {
  delete error.extensions!.id;

  return error;
};

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class RevokeRefreshTokensError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.FAILED_TO_REVOKE_REFRESH_TOKENS,
      ErrorType.FAILED_TO_REVOKE_USER_REFRESH_TOKENS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: RevokeRefreshTokensError.name,
    });
  }
}
