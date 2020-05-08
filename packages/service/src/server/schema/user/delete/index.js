import { Permission } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError } from 'types/customError';
import {
  UserDeleteError,
  UserSelfDeleteError,
} from 'types/customError/user/delete';
import { InternalErrorMessage } from 'types/errorMessage';

const MUTATION_NAME = 'userDelete';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { id }, context) => {
  const { db, user } = context;

  debugLog(`👾 ${MUTATION_NAME}`, id);

  if (user.id === id) {
    log.error(InternalErrorMessage.USER_SELF_DELETE_ATTEMPTED, {
      mutation: MUTATION_NAME,
      username: user.username,
    });

    throw new UserSelfDeleteError({ username: user.username });
  }

  let wasUpdated = false;

  try {
    const { deletedAt } = await db.user.save({
      deletedAt: new Date(),
      deletedBy: user.id,
      id,
    });

    wasUpdated = Boolean(deletedAt);
  } catch (error) {
    log.error(InternalErrorMessage.USER_DELETE_FAILED, {
      error,
      id,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(InternalErrorMessage.USER_DELETE_FAILED, {
      id,
      mutation: MUTATION_NAME,
    });

    throw new UserDeleteError({ id });
  }

  debugLog('✅ User deleted successfully', id);

  return true;
};

const typeDefs = gql`
  "Mutations"
  type Mutation {
    "Deletes a user from the system"
    ${MUTATION_NAME}(
      "The id of the user to be deleted"
      id: ID!
    ): Boolean!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
