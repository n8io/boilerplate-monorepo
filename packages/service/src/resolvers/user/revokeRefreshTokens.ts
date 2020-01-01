import { Arg, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { ProcessEnvKeys } from '../../types/processEnv';

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
      await getConnection()
        .getRepository(User)
        .increment({ id }, 'tokenVersion', 1);
    } catch (error) {
      console.error('🛑', error);

      return false;
    }

    return true;
  }
}
