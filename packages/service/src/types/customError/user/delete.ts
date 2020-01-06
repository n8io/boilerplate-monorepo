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

export class UserSelfDeleteError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.CANNOT_DELETE_SELF,
      ErrorType.SELF_DELETE,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserSelfDeleteError.name });
  }
}

export class UserDeleteError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.FAILED_TO_DELETE_USER,
      ErrorType.FAILED_TO_DELETE_USER,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserDeleteError.name });
  }
}
