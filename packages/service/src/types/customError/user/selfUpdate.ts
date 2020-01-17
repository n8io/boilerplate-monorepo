import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = (error: GraphQLError) => {
  delete error.extensions!.email;
  delete error.extensions!.username;

  error.message = PublicErrorMessage.FAILED_TO_UPDATE_SELF;

  return error;
};

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class UserSelfUpdateNotFoundError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.FAILED_TO_UPDATE_SELF_NOT_FOUND,
      ErrorType.FAILED_TO_UPDATE_SELF,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfUpdateNotFoundError.name,
    });
  }
}
