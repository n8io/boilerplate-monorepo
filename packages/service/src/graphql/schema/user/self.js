import { gql } from 'apollo-server-express';
import { userRead } from 'db/user/userRead';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Auth } from 'types/auth';
import {
  DatabaseError,
  UserSelfDeletedError,
  UserSelfError,
  UserSelfNotFoundError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';

const QUERY_NAME = 'userSelf';

const debugLog = logFactory({ method: QUERY_NAME, module: 'resolvers/user' });

// eslint-disable-next-line max-statements
const resolver = async (_parent, _args, context) => {
  const { user } = context;

  if (!user) {
    log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF_NO_USER_ON_CONTEXT, {
      query: QUERY_NAME,
    });

    throw new UserSelfError();
  }

  let userSelf = null;

  try {
    userSelf = await userRead({ id: user.id }, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, {
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

    log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, errorData);

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

  debugLog('✅ Found me self', userSelf);

  return userSelf;
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

  type Query {
    "Return the actively logged in user"
    ${QUERY_NAME}: UserSnapshot! @isAuthenticated
  }
`;

export { resolver, typeDefs };
