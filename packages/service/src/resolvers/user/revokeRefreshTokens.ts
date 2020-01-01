import { User } from 'entity/User';
import { log } from 'logger';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { AuthError } from 'types/error';
import { ProcessEnvKeys } from 'types/processEnv';

@Resolver()
export class RevokeRefreshTokens {
  @Mutation(() => Boolean, {
    description:
      'Revokes all the refresh tokens for the provided user id. Please allow up to ' +
      process.env[ProcessEnvKeys.ACCESS_TOKEN_EXPIRY] +
      ' for any sessions to expire.',
  })
  async revokeRefreshTokens(
    @Arg('id', {
      description: 'The user id of the user to revoke all refresh tokens',
    })
    id: string
  ) {
    try {
      const { affected } = await getConnection()
        .getRepository(User)
        .increment({ id }, 'tokenVersion', 1);

      const wasUpdated = Boolean(affected);

      if (!wasUpdated) {
        log.error(AuthError.FAILED_TO_REVOKE_USER_REFRESH_TOKENS, id);
      }

      return wasUpdated;
    } catch (error) {
      log.error(AuthError.FAILED_DB_REQUEST, error);

      return false;
    }

    return true;
  }
}
