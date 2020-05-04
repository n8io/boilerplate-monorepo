import { Permission } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError, UserRevokeRefreshTokensError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';

const MUTATION_NAME = 'userRevokeRefreshTokens';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { id }, context) => {
  debugLog(`👾 ${MUTATION_NAME}`, id);

  const { db } = context;

  let wasUpdated = false;

  try {
    wasUpdated = await db.user.revokeRefreshTokens(id);
  } catch (error) {
    log.error(InternalErrorMessage.USER_REVOKE_REFRESH_TOKENS_FAILED, {
      error,
      id,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(InternalErrorMessage.USER_REVOKE_REFRESH_TOKENS_FAILED, {
      id,
      mutation: MUTATION_NAME,
    });

    throw new UserRevokeRefreshTokensError();
  }

  debugLog('✅ Successfully revoked refresh token for user', id);

  return true;
};

const typeDefs = gql`
  "Mutations"
  type Mutation {
    "Revoke all the refresh tokens for a user"
    ${MUTATION_NAME}(id: ID!): Boolean!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
