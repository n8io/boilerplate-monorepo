import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = (error: GraphQLError) => {
  delete error.extensions!.email;
  delete error.extensions!.username;

  error.message = PublicErrorMessage.FAILED_TO_REGISTER_USER;

  return error;
};

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class RegisterUserError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.FAILED_TO_REGISTER_USER,
      ErrorType.FAILED_TO_REGISTER_USER,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: RegisterUserError.name });
  }
}

export class RegisterUserAlreadyExistsError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.FAILED_TO_REGISTER_USER_ALREADY_EXISTS,
      ErrorType.FAILED_TO_REGISTER_USER_ALREADY_EXISTS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: RegisterUserAlreadyExistsError.name,
    });
  }
}
