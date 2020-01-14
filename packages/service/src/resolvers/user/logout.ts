import { logFactory } from 'log/logFactory';
import { Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';

const debugLog = logFactory({ method: 'userLogout', module: 'resolvers/user' });

@Resolver()
export class UserLogout {
  @Mutation(() => Boolean, { description: 'Logout the current user' })
  @Authorized()
  async userLogout(@Ctx() { res, user }: Context) {
    const { username } = user!;

    debugLog('👾 Logout', { username });

    Auth.writeRefreshToken(res);

    return true;
  }
}
