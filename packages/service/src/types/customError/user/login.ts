import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = (error: GraphQLError) => {
  delete error.extensions!.deleted_at;
  delete error.extensions!.username;

  error.message = PublicErrorMessage.INVALID_LOGIN;

  return error;
};

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class UserInvalidLoginError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.INVALID_LOGIN,
      ErrorType.FAILED_LOGIN,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: UserInvalidLoginError.name });
  }
}

export class UserInvalidLoginUserNotFoundError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.USER_NOT_FOUND,
      ErrorType.FAILED_LOGIN_USER_NOT_FOUND,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginUserNotFoundError.name,
    });
  }
}

export class UserInvalidLoginPasswordMismatchError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.PASSWORD_MISMATCH,
      ErrorType.FAILED_LOGIN_PASSWORD_MISMATCH,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginPasswordMismatchError.name,
    });
  }
}

export class UserInvalidLoginUserDeletedError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      InternalErrorMessage.USER_IS_DELETED,
      ErrorType.FAILED_LOGIN_USER_DELETED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UserInvalidLoginUserDeletedError.name,
    });
  }
}
