import 'dotenv/config';
import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { DatabaseError } from 'types/customError/database';
import { UserRevokeRefreshTokensError } from 'types/customError/user/revokeRefreshTokens';
import { InternalErrorMessage } from 'types/errorMessage';
import { ProcessEnvKeys } from 'types/processEnv';
import { UserRole } from 'types/userRole';

const debugLog = logFactory({
  method: 'revokeRefreshTokens',
  module: 'resolvers/user',
});

@Resolver()
export class UserRevokeRefreshTokens {
  @Mutation(() => Boolean, {
    description:
      'Revokes all the refresh tokens for the provided user id. Please allow up to ' +
      process.env[ProcessEnvKeys.ACCESS_TOKEN_EXPIRY] +
      ' for any sessions to expire.',
  })
  @Authorized([UserRole.ADMIN])
  async userRevokeRefreshTokens(
    @Arg('id', {
      description: 'The user id of the user to revoke all refresh tokens',
    })
    id: string
  ) {
    debugLog('👾 User id', id);

    let wasUpdated = false;

    try {
      const { affected } = await getConnection()
        .getRepository(User)
        .increment({ id }, 'tokenVersion', 1);

      wasUpdated = Boolean(affected);
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_REVOKE_REFRESH_TOKENS, {
        error,
        id,
        mutation: this.userRevokeRefreshTokens.name,
      });

      throw new DatabaseError();
    }

    if (!wasUpdated) {
      log.error(InternalErrorMessage.FAILED_TO_REVOKE_REFRESH_TOKENS, {
        id,
        mutation: this.userRevokeRefreshTokens.name,
      });

      throw new UserRevokeRefreshTokensError();
    }

    debugLog('✅ Successfully revoked refresh token for user', id);

    return true;
  }
}
