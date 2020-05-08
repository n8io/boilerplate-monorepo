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

const QUERY_NAME = 'userSelf';

const debugLog = logFactory({ method: QUERY_NAME, module: 'resolvers/user' });

// eslint-disable-next-line max-statements
const resolver = async (_parent, _args, context) => {
  const { loaders, user } = context;
  const { user: userLoader } = loaders;

  let userSelf = null;

  try {
    userSelf = await userLoader.load(user.id);
  } catch (error) {
    log.error(InternalErrorMessage.USER_SELF_FETCH_FAILED, {
      error,
      query: QUERY_NAME,
    });

    throw new DatabaseError();
  }

  if (!userSelf) {
    const errorData = {
      id: user.id,
      query: QUERY_NAME,
      username: user.username,
    };

    log.error(InternalErrorMessage.USER_SELF_FETCH_FAILED, errorData);

    throw new UserSelfNotFoundError(errorData);
  }

  if (!Auth.isUserActive(userSelf)) {
    log.error(InternalErrorMessage.USER_IS_DELETED, {
      deletedAt: userSelf.deletedAt,
      query: QUERY_NAME,
      username: userSelf.username,
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
