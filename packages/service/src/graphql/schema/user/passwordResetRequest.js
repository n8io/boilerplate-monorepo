import { UserPasswordResetRequestInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { addMinutes } from 'date-fns/fp';
import { userReadRaw } from 'db/user/userReadRaw';
import { userSave } from 'db/user/userSave';
import { passwordReset } from 'email/user/passwordReset';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import { DatabaseError, EmailError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';
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

  let user = null;

  try {
    user = await userReadRaw({ id }, context);
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

  const passwordResetTokenExpiration = addMinutes(
    Password.RESET_TOKEN_EXPIRATION_IN_MINUTES,
    new Date()
  );

  try {
    await userSave(
      { id, passwordResetToken, passwordResetTokenExpiration },
      context
    );
  } catch (error) {
    log.error(InternalErrorMessage.USER_SELF_UPDATE_FAILED, {
      error,
      query: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  try {
    await passwordReset({ passwordResetToken, user }, context);
  } catch (error) {
    log.error(InternalErrorMessage.EMAIL_PASSWORD_RESET_SEND_FAILED, {
      error,
      query: MUTATION_NAME,
      username: user.username,
    });

    throw new EmailError();
  }

  return true;
};

const { USER_ACCOUNT_RECOVERY_NOTIFY } = RateLimit.Map;
const { burst: Burst, window: Window } = USER_ACCOUNT_RECOVERY_NOTIFY;

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
    ${MUTATION_NAME}(input: UserPasswordResetRequestInput!): Boolean!
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
