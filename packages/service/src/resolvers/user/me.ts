import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { toSafeLog } from 'types/auth/transforms';
import { Context } from 'types/context';
import {
  DatabaseError,
  MeError,
  MeUserDeletedError,
  MeUserNotFoundError,
} from 'types/customError';
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
      log.error(
        InternalErrorMessage.FAILED_TO_RETRIEVE_SELF_NO_USER_ON_CONTEXT,
        { query: 'me' }
      );

      throw new MeError();
    }

    let me;

    try {
      me = await User.findOne({ id: user!.id });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, {
        query: 'me',
        error,
      });

      throw new DatabaseError();
    }

    if (!me) {
      const errorData = {
        id: user.id,
        query: 'me',
        username: user.username,
      };

      log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, errorData);

      throw new MeUserNotFoundError(errorData);
    }

    if (!Auth.isUserActive(me)) {
      log.error(InternalErrorMessage.USER_IS_DELETED, {
        deleted_at: me.deletedAt,
        query: this.me.name,
        username: me.username,
      });

      throw new MeUserDeletedError({
        deleted_at: me.deletedAt,
        username: me.username,
      });
    }

    debugLog('✅ Found me', toSafeLog(me));

    return me;
  }
}
