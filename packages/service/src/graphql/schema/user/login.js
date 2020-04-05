import { gql } from 'apollo-server-express';
import { compare } from 'bcryptjs';
import { userReadRaw } from 'db/user/userReadRaw';
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

const MUTATION_NAME = 'userLogin';
const debugLog = logFactory({ method: 'userLogin', module: 'resolvers/user' });

// eslint-disable-next-line complexity,max-statements
const resolver = async (_parent, { input }, context) => {
  const { username, password: clearTextPassword } = input;
  const { res } = context;

  const criteria =
    username.indexOf('@') > -1 ? { email: username } : { username };

  let user = null;

  debugLog('👾 UserLogin', { username });

  try {
    user = await userReadRaw(criteria, context);
  } catch (error) {
    log.error(InternalErrorMessage.USER_NOT_FOUND, {
      error,
      mutation: MUTATION_NAME,
      username,
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
      query: MUTATION_NAME,
      username: user.username,
    });

    throw new UserInvalidLoginUserDeletedError({
      deletedAt: user.deletedAt,
      username: user.username,
    });
  }

  const isPasswordMatch = await compare(clearTextPassword, user.passwordHash);

  if (!isPasswordMatch) {
    debugLog(`🔏 ${InternalErrorMessage.PASSWORD_MISMATCH}`, { username });

    throw new UserInvalidLoginPasswordMismatchError({ username });
  }

  Auth.writeRefreshToken(res, user);

  debugLog(`✅ User logged in successfully`, { username });

  return Auth.encryptAccessToken(user);
};

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
    userLogin(input: UserLoginInput!): String!
      @rateLimitWindow(limit: 50, duration: ${15 * 60 /* 15min */})
      @rateLimitBurst(limit: 10, duration: 30)
  }
`;

export { resolver, typeDefs };
