import { UserPasswordResetInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { isAfter, parseISO } from 'date-fns/fp';
import { passwordResetSuccess } from 'email/user/passwordResetSuccess';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import {
  DatabaseError,
  UserPasswordResetTokenExpiredError,
  UserPasswordResetTokenMismatchError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';
import { RateLimit } from 'types/rateLimit';
import { Telemetry } from 'types/telemetry';

const MUTATION_NAME = 'userPasswordReset';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line complexity, max-statements
const resolver = async (_parent, { input }, context) => {
  debugLog(`👾 ${MUTATION_NAME}`, input);

  const { db } = context;

  const telemetry = {
    input,
    query: MUTATION_NAME,
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_PASSWORD_RESET,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  await UserPasswordResetInput.validationSchemaServer.validate(input);

  const { id, passwordNew: clearTextPassword, token } = input;

  let user = null;

  try {
    user = await db.user.readRaw({ id });
  } catch (error) {
    log.error(InternalErrorMessage.USER_FETCH_FAILED, {
      error,
      ...telemetry,
    });

    throw new DatabaseError();
  }

  if (!user) {
    log.error(InternalErrorMessage.USER_FETCH_FAILED, telemetry);

    return true;
  }

  if (!Auth.isUserActive(user)) {
    log.error(InternalErrorMessage.USER_IS_DELETED, {
      deletedAt: user.deletedAt,
      ...telemetry,
    });

    return true;
  }

  const { passwordResetToken, passwordResetTokenExpiration } = user;

  if (passwordResetToken !== token) {
    log.error(
      InternalErrorMessage.USER_PASSWORD_RESET_FAILED_TOKEN_MISMATCH,
      telemetry
    );

    throw new UserPasswordResetTokenMismatchError();
  }

  const now = new Date();
  const isResetTokenExpired =
    !passwordResetTokenExpiration ||
    isAfter(parseISO(passwordResetTokenExpiration), now);

  if (isResetTokenExpired) {
    log.error(
      InternalErrorMessage.USER_PASSWORD_RESET_FAILED_TOKEN_MISMATCH,
      telemetry
    );

    throw new UserPasswordResetTokenExpiredError();
  }

  const passwordHash = await Password.hash(clearTextPassword);

  try {
    await db.user.save({
      id,
      passwordHash,
      passwordResetToken: null,
      passwordResetTokenExpiration: null,
    });
  } catch (error) {
    log.error(InternalErrorMessage.USER_SELF_UPDATE_FAILED, {
      error,
      ...telemetry,
    });

    throw new DatabaseError();
  }

  try {
    await passwordResetSuccess({ user });
  } catch (error) {
    log.error(
      InternalErrorMessage.EMAIL_PASSWORD_RESET_SUCCESSFUL_SEND_FAILED,
      {
        error,
        ...telemetry,
      }
    );
  }

  return true;
};

const { burst: Burst, window: Window } = RateLimit.USER_PASSWORD_RESET;

const typeDefs = gql`
  "The user password reset input"
  input UserPasswordResetInput {
    "The user's unique identifier"
    id: ID!
    "The user's new password"
    passwordNew: String!
    "The user's reset password token"
    token: String!
  }

  "Mutations"
  type Mutation {
    "The user password reset mutation to update the user's password"
    ${MUTATION_NAME}(
      "The input for the user password reset mutation"
      input: UserPasswordResetInput!
    ): Boolean!
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
