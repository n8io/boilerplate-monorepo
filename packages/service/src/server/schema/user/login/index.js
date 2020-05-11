import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import {
  UserInvalidLoginError,
  UserInvalidLoginPasswordMismatchError,
  UserInvalidLoginUserDeletedError,
  UserInvalidLoginUserNotFoundError,
} from 'types/customError/user/login';
import { InternalErrorMessage } from 'types/errorMessage';
import { Password } from 'types/password';
import { RateLimit } from 'types/rateLimit';
import { Telemetry } from 'types/telemetry';

const MUTATION_NAME = 'userLogin';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line complexity,max-statements
const resolver = async (_parent, { input }, context) => {
  const { password: clearTextPassword, username } = input;
  const { db, res } = context;

  const telemetry = {
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_LOGIN,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  const criteria =
    username.indexOf('@') > -1 ? { email: username } : { username };

  let user = null;

  debugLog(`👾 ${MUTATION_NAME}`, { username });

  try {
    user = await db.user.readRaw(criteria);
  } catch (error) {
    log.error(InternalErrorMessage.USER_NOT_FOUND, {
      error,
      input,
      mutation: MUTATION_NAME,
      ...telemetry,
    });

    throw new UserInvalidLoginError();
  }

  if (!user) {
    debugLog(`🤷 ${InternalErrorMessage.USER_NOT_FOUND}`, { username });

    throw new UserInvalidLoginUserNotFoundError({ username });
  }

  if (!Auth.isUserActive(user)) {
    log.error(InternalErrorMessage.USER_IS_DELETED, {
      deletedAt: user.deletedAt,
      input,
      query: MUTATION_NAME,
      ...telemetry,
    });

    throw new UserInvalidLoginUserDeletedError({
      deletedAt: user.deletedAt,
      username: user.username,
    });
  }

  const isPasswordMatch = await Password.compare(
    clearTextPassword,
    user.passwordHash
  );

  if (!isPasswordMatch) {
    debugLog(`🔏 ${InternalErrorMessage.PASSWORD_MISMATCH}`, { username });

    throw new UserInvalidLoginPasswordMismatchError({ username });
  }

  Auth.writeRefreshToken(res, user);

  debugLog(`✅ User logged in successfully`, { username });

  return Auth.encryptAccessToken(user);
};

const { burst: Burst, window: Window } = RateLimit.USER_LOGIN;
const { duration, limit } = RateLimit.USER_LOGIN_USERNAME;

const typeDefs = gql`
  "The user login input"
  input UserLoginInput {
    "The user provided clear text password"
    password: String!
    "The user provided username"
    username: String!
  }

  "Mutations"
  type Mutation {
    "The user login mutation"
    ${MUTATION_NAME}(
      "The input for the user login mutation"
      input: UserLoginInput!
    ): String!
      @rateLimitWindow(limit: ${Window.limit}, duration: ${Window.duration})
      @rateLimitBurst(limit: ${Burst.limit}, duration: ${Burst.duration})
      @rateLimitUsername(limit: ${limit}, duration: ${duration})
  }
`;

export { resolver, typeDefs };
