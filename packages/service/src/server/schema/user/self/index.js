import { UserSnapshot } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import {
  DatabaseError,
  UserSelfDeletedError,
  UserSelfNotFoundError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Telemetry } from 'types/telemetry';

const QUERY_NAME = 'userSelf';

const debugLog = logFactory({ method: QUERY_NAME, module: 'resolvers/user' });

// eslint-disable-next-line max-statements
const resolver = async (_parent, _args, context) => {
  const { loaders, user } = context;
  const { user: userLoader } = loaders;

  debugLog(`👾 ${QUERY_NAME}`);

  const telemetry = {
    query: QUERY_NAME,
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_SELF,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  let userSelf = null;

  try {
    userSelf = await userLoader.load(user.id);
  } catch (error) {
    log.error(InternalErrorMessage.USER_SELF_FETCH_FAILED, {
      error,
      ...telemetry,
    });

    throw new DatabaseError();
  }

  if (!userSelf) {
    log.error(InternalErrorMessage.USER_SELF_FETCH_FAILED, telemetry);

    throw new UserSelfNotFoundError(telemetry);
  }

  if (!Auth.isUserActive(userSelf)) {
    log.error(InternalErrorMessage.USER_IS_DELETED, {
      deletedAt: userSelf.deletedAt,
      ...telemetry,
    });

    throw new UserSelfDeletedError({
      deletedAt: userSelf.deletedAt,
      username: userSelf.username,
    });
  }

  debugLog('✅ Found self', userSelf);

  return UserSnapshot.make(userSelf);
};

const typeDefs = gql`
  "The user role enumeration"
  enum UserRole {
    "The admin user role"
    ADMIN
    "The default user role"
    USER
  }

  "The user type"
  type UserSnapshot {
    "The user's email"
    email: EmailAddress!
    "The user's last name"
    familyName: String!
    "The user's first name"
    givenName: String!
    "The user's unique id"
    id: String!
    "The user's role"
    role: UserRole!
    "The user's unique username"
    username: String!
  }

  "The root query"
  type Query {
    "Return the actively logged in user"
    ${QUERY_NAME}: UserSnapshot! @isAuthenticated
  }
`;

export { resolver, typeDefs };
