import { gql } from 'apollo-server-express';
import { formatDistance, isAfter } from 'date-fns/fp';
import { userReadRaw } from 'db/user/userReadRaw';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError } from 'types/customError';
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

  debugLog(`👾 ${QUERY_NAME}`, { passwordResetToken });

  let user = null;

  try {
    user = await userReadRaw({ passwordResetToken }, context);
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
  const isResetTokenExpired = isAfter(passwordResetTokenExpiration, now);

  if (isResetTokenExpired) {
    log.error(InternalErrorMessage.AUTH_PASSWORD_RESET_TOKEN_EXPIRED, {
      token: passwordResetToken,
      when: formatDistance(passwordResetTokenExpiration, now),
    });

    return null;
  }

  debugLog(`✅ Successfully validated password reset token`, {
    expiresIn: formatDistance(passwordResetTokenExpiration, now),
  });

  return user.id;
};

const { USER_PASSWORD_RESET_VALIDATE } = RateLimit.Map;
const { burst: Burst, window: Window } = USER_PASSWORD_RESET_VALIDATE;

const typeDefs = gql`
  "The user password reset token validate input"
  input UserPasswordResetTokenValidateInput {
    "The user's password reset token"
    token: String!
  }

  type Query {
    "The user password reset token validate mutation"
    ${QUERY_NAME}(input: UserPasswordResetTokenValidateInput!): ID
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
  }
`;

export { resolver, typeDefs };
