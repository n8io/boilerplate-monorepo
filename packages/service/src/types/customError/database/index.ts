import { ApolloError } from 'apollo-server-express';
import { identity } from 'ramda';
import { PublicErrorMessage } from 'types/errorMessage';
import { ErrorProperties } from 'types/errorProperties';
import { ErrorType } from 'types/errorType';

const toSafeError = identity;

const appendSafeError = (props: ErrorProperties | undefined) => ({
  ...props,
  toSafeError,
});

export class DatabaseError extends ApolloError {
  constructor(properties?: ErrorProperties) {
    super(
      PublicErrorMessage.DATABASE_ERROR_OCCURRED,
      ErrorType.DATABASE_ERROR_OCCURRED,
      appendSafeError(properties)
    );

    Object.defineProperty(this, 'name', { value: DatabaseError.name });
  }
}
