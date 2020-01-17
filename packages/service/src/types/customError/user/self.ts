import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = (error: GraphQLError) => {
  delete error.extensions!.username;

  error.message = PublicErrorMessage.FAILED_TO_RETRIEVE_SELF;

  return error;
};

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class UserSelfError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.FAILED_TO_RETRIEVE_SELF,
      ErrorType.FAILED_TO_RETRIEVE_SELF,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserSelfError.name });
  }
}

export class UserSelfNotFoundError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.USER_NOT_FOUND,
      ErrorType.FAILED_TO_RETRIEVE_SELF_USER_NOT_FOUND,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfNotFoundError.name,
    });
  }
}

export class UserSelfDeletedError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.USER_IS_DELETED,
      ErrorType.USER_DELETED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserSelfDeletedError.name,
    });
  }
}
