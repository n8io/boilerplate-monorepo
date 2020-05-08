import { gql } from 'apollo-server-express';
import { formatDistance, isAfter } from 'date-fns/fp';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError } from 'types/customError';
import { DateTime } from 'types/dateTime';
import { InternalErrorMessage } from 'types/errorMessage';
import { RateLimit } from 'types/rateLimit';

const QUERY_NAME = 'userPasswordResetTokenValidate';

const debugLog = logFactory({
  method: QUERY_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { input }, context) => {
  const { token: passwordResetToken } = input;
  const { db } = context;

  debugLog(`👾 ${QUERY_NAME}`, { passwordResetToken });

  let user = null;

  try {
    user = await db.user.readRaw({ passwordResetToken });
  } catch (error) {
    log.error(InternalErrorMessage.USER_FETCH_FAILED, {
      error,
      query: QUERY_NAME,
    });

    throw new DatabaseError();
  }

  if (!user) {
    const errorData = {
      input,
      query: QUERY_NAME,
    };

    log.error(InternalErrorMessage.USER_FETCH_FAILED, errorData);

    return null;
  }

  const { passwordResetTokenExpiration } = user;
  const now = new Date();

  if (!passwordResetTokenExpiration) {
    log.error(InternalErrorMessage.AUTH_PASSWORD_RESET_TOKEN_NOT_FOUND, {
      token: passwordResetToken,
    });

    return null;
  }

  const expiration = DateTime.toSafeDate(passwordResetTokenExpiration);
  const isResetTokenExpired = isAfter(expiration, now);

  if (isResetTokenExpired) {
    log.error(InternalErrorMessage.AUTH_PASSWORD_RESET_TOKEN_EXPIRED, {
      token: passwordResetToken,
      when: formatDistance(expiration, now),
    });

    return null;
  }

  debugLog(`✅ Successfully validated password reset token`, {
    expiresIn: formatDistance(expiration, now),
  });

  return user.id;
};

const { burst: Burst, window: Window } = RateLimit.USER_PASSWORD_RESET_VALIDATE;

const typeDefs = gql`
  "The user password reset token validate input"
  input UserPasswordResetTokenValidateInput {
    "The user's password reset token"
    token: String!
  }

  type Query {
    "The user password reset token validate mutation"
    ${QUERY_NAME}(
      "The input for the user password reset token validation mutation"
      input: UserPasswordResetTokenValidateInput!
    ): ID
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
