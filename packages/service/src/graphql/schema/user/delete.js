import { gql } from 'apollo-server-express';
import { userSave } from 'db/user/userSave';
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
  const { user } = context;

  debugLog('👾 UserDelete', id);

  if (user.id === id) {
    log.error(InternalErrorMessage.USER_ATTEMPTED_TO_SELF_DELETE, {
      mutation: MUTATION_NAME,
      username: user.username,
    });

    throw new UserSelfDeleteError({ username: user.username });
  }

  let wasUpdated = false;

  try {
    const { deletedAt } = await userSave(
      { deletedAt: new Date(), id },
      context
    );

    wasUpdated = Boolean(deletedAt);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_DELETE_USER, {
      error,
      id,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(InternalErrorMessage.FAILED_TO_DELETE_USER, {
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
    userDelete(id: ID!): Boolean
      @hasPermission(permission: "USER_DELETE")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
