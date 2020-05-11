import { Permission } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { DatabaseError, UserRevokeRefreshTokensError } from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { Telemetry } from 'types/telemetry';

const MUTATION_NAME = 'userRevokeRefreshTokens';

const debugLog = logFactory({
  method: MUTATION_NAME,
  module: 'resolvers/user',
});

// eslint-disable-next-line max-statements
const resolver = async (_parent, input, context) => {
  const { id } = input;

  debugLog(`👾 ${MUTATION_NAME}`, id);

  const { db } = context;

  const telemetry = {
    input,
    query: MUTATION_NAME,
    ...Telemetry.contextToLog(context),
    tags: {
      [Telemetry.Tag.COMPONENT]: Telemetry.Component.USER_REVOKE_REFRESH_TOKENS,
      [Telemetry.Tag.MODULE]: Telemetry.Module.RESOLVER,
    },
  };

  let wasUpdated = false;

  try {
    wasUpdated = await db.user.revokeRefreshTokens(id);
  } catch (error) {
    log.error(InternalErrorMessage.USER_REVOKE_REFRESH_TOKENS_FAILED, {
      error,
      ...telemetry,
    });

    throw new DatabaseError();
  }

  if (!wasUpdated) {
    log.error(
      InternalErrorMessage.USER_REVOKE_REFRESH_TOKENS_FAILED,
      telemetry
    );

    throw new UserRevokeRefreshTokensError();
  }

  debugLog('✅ Successfully revoked refresh token for user', id);

  return true;
};

const typeDefs = gql`
  "Mutations"
  type Mutation {
    "Revoke all the refresh tokens for a user"
    ${MUTATION_NAME}(
      "The id of the user to revoke refresh tokens for"
      id: ID!
    ): Boolean!
      @hasPermission(permission: "${Permission.USERS_MANAGE}")
      @isAuthenticated
  }
`;

export { resolver, typeDefs };
