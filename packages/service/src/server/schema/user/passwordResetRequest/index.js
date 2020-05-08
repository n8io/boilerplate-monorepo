import { UserPasswordResetRequestInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { passwordReset } from 'email/user/passwordReset';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import { DatabaseError, EmailSendError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { RateLimit } from 'types/rateLimit';

const MUTATION_NAME = 'userPasswordResetRequest';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  debugLog(`👾 ${MUTATION_NAME}`, input);

  await UserPasswordResetRequestInput.validationSchema.validate(input);

  const { id } = input;
  const { db } = context;

  let user = null;

  try {
    user = await db.user.readRaw({ id });
  } catch (error) {
    log.error(InternalErrorMessage.USER_FETCH_FAILED, {
      error,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!user) {
    const errorData = {
      input,
      mutation: MUTATION_NAME,
    };

    log.error(InternalErrorMessage.USER_FETCH_FAILED, errorData);

    return true;
  }

  const passwordResetToken = Auth.generateResetToken();
  const passwordResetTokenExpiration = Auth.generateResetTokenExpiration();

  try {
    await db.user.save({
      id,
      passwordResetToken,
      passwordResetTokenExpiration,
    });
  } catch (error) {
    log.error(InternalErrorMessage.USER_SELF_UPDATE_FAILED, {
      error,
      query: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  try {
    await passwordReset({ passwordResetToken, user });
  } catch (error) {
    log.error(InternalErrorMessage.EMAIL_PASSWORD_RESET_SEND_FAILED, {
      error,
      query: MUTATION_NAME,
      username: user.username,
    });

    throw new EmailSendError();
  }

  return true;
};

const { burst: Burst, window: Window } = RateLimit.USER_ACCOUNT_RECOVERY_NOTIFY;

const typeDefs = gql`
  "The user recovery notification method enumeration"
  enum UserRecoveryNotificationMethod {
    "Email"
    EMAIL
    "Text message"
    SMS
  }

  "The user recovery notify input"
  input UserPasswordResetRequestInput {
    "The user's unique identifier"
    id: ID!
    "The notification method the user has chosen"
    notificationMethod: UserRecoveryNotificationMethod!
  }

  "Mutations"
  type Mutation {
    "The user password reset request mutation that initiates a password reset"
    ${MUTATION_NAME}(
      "The input for the user password reset request mutation"
      input: UserPasswordResetRequestInput!
    ): Boolean!
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
