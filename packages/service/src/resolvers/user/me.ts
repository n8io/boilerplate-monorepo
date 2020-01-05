import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { toSafeLog } from 'types/auth/transforms';
import { Context } from 'types/context';
import { InternalErrorMessage } from 'types/errorMessage';
import { UserRole } from 'types/userRole';

const debugLog = logFactory({ method: 'me', module: 'resolvers/user' });

@ObjectType({ description: `The logged in user's information` })
class MeResponse {
  @Field({ description: `The logged in user's unique id` })
  id: string;
  @Field({ description: `The logged in user's unique email` })
  email: string;
  @Field({ description: `The logged in user's authorization level` })
  role: UserRole;
  @Field({ description: `The logged in user's unique username` })
  username: string;
}

@Resolver()
export class Me {
  @Query(() => MeResponse, {
    description: `Fetch the logged in user's information`,
    nullable: true,
  })
  async me(@Ctx() { user }: Context) {
    if (!user) {
      debugLog('🤷 No user was found on the request context');

      return null;
    }

    try {
      const me = (await User.findOne({ id: user!.id })) as User;

      if (!me) {
        log.error(InternalErrorMessage.USER_NOT_FOUND, {
          id: user.id,
          query: 'me',
          username: user.username,
        });

        return null;
      }

      debugLog('✅ Found me', toSafeLog(me));

      return me;
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, { query: 'me', error });

      return null;
    }
  }
}
