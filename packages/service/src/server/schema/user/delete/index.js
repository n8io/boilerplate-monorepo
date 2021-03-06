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
import { Telemetry } from 'types/telemetry';

const MUTATION_NAME = 'userDelete';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, input, context) => {
  const { id } = input;
  const { db, user } = context;

  debugLog(`👾 ${MUTATION_NAME}`, id);

  const telemetry = {
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_DELETE,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  if (user.id === id) {
    log.error(InternalErrorMessage.USER_SELF_DELETE_ATTEMPTED, {
      query: MUTATION_NAME,
      ...telemetry,
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
      input,
      query: MUTATION_NAME,
      telemetry,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(InternalErrorMessage.USER_DELETE_FAILED, {
      input,
      query: MUTATION_NAME,
      ...telemetry,
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
