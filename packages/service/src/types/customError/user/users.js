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

class UsersError extends ApolloError {
  constructor(properties) {
    super(
      PublicErrorMessage.FAILED_TO_FETCH_USERS,
      ErrorType.FAILED_TO_FETCH_USERS,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', {
      value: UsersError.name,
    });
  }
}

export { UsersError };
