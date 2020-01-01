import { User } from 'entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
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
        console.error(
          `🛑 Could not revoke refresh tokens for the given user id. User id (${id}) not found.`
        );
      }

      return wasUpdated;
    } catch (error) {
      console.error('🛑', error);

      return false;
    }

    return true;
  }
}
