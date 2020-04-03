import { Permission } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { userRevokeRefreshTokens } from 'db/user/userRevokeRefreshTokens';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError, UserRevokeRefreshTokensError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';

const MUTATION_NAME = 'userRevokeRefreshTokens';

const debugLog = logFactory({
  method: 'revokeRefreshTokens',
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, { id }, context) => {
  debugLog('👾 UserRevokeRefreshTokens', id);

  let wasUpdated = false;

  try {
    wasUpdated = await userRevokeRefreshTokens(id, context);
  } catch (error) {
    log.error(InternalErrorMessage.FAILED_TO_REVOKE_REFRESH_TOKENS, {
      error,
      id,
      mutation: MUTATION_NAME,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(InternalErrorMessage.FAILED_TO_REVOKE_REFRESH_TOKENS, {
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
    userRevokeRefreshTokens(id: ID!): Boolean
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
