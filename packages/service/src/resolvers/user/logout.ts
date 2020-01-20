import { logFactory } from 'log/logFactory';
import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';

const debugLog = logFactory({ method: 'userLogout', module: 'resolvers/user' });

@Resolver()
export class UserLogout {
  @Mutation(() => Boolean, { description: 'Logout the current user' })
  async userLogout(@Ctx() { res, user }: Context) {
    if (user) {
      debugLog('👾 UserLogout', { username: user.username });
    }

    Auth.writeRefreshToken(res);

    if (user) {
      debugLog(`✅ User logged out successfully`, { username: user.username });
    }

    return true;
  }
}
