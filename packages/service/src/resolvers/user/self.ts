import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import {
  Ctx,
  Field,
  ObjectType,
  Query,
  Resolver,
  Authorized,
} from 'type-graphql';
import { Auth } from 'types/auth';
import { toSafeLog } from 'types/auth/transforms';
import { Context } from 'types/context';
import {
  DatabaseError,
  UserSelfError,
  UserSelfDeletedError,
  UserSelfNotFoundError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { UserRole } from 'types/userRole';

const debugLog = logFactory({ method: 'me', module: 'resolvers/user' });

@ObjectType({ description: `The logged in user's information` })
export class UserSelfResponse {
  @Field({ description: `The logged in user's unique id` })
  id: string;
  @Field({ description: `The logged in user's unique email` })
  email: string;
  @Field({ description: `The logged in user's family name` })
  familyName: string;
  @Field({ description: `The logged in user's given name` })
  givenName: string;
  @Field({ description: `The logged in user's authorization level` })
  role: UserRole;
  @Field({ description: `The logged in user's unique username` })
  username: string;
}

@Resolver()
export class UserSelf {
  @Query(() => UserSelfResponse, {
    description: `Fetch the logged in user's information`,
    nullable: true,
  })
  @Authorized()
  async userSelf(@Ctx() { user }: Context) {
    if (!user) {
      log.error(
        InternalErrorMessage.FAILED_TO_RETRIEVE_SELF_NO_USER_ON_CONTEXT,
        { query: 'userSelf' }
      );

      throw new UserSelfError();
    }

    let self;

    try {
      self = await User.findOne({ id: user!.id });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, {
        query: 'userSelf',
        error,
      });

      throw new DatabaseError();
    }

    if (!self) {
      const errorData = {
        id: user.id,
        query: 'userSelf',
        username: user.username,
      };

      log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, errorData);

      throw new UserSelfNotFoundError(errorData);
    }

    if (!Auth.isUserActive(self)) {
      log.error(InternalErrorMessage.USER_IS_DELETED, {
        deleted_at: self.deletedAt,
        query: this.userSelf.name,
        username: self.username,
      });

      throw new UserSelfDeletedError({
        deleted_at: self.deletedAt,
        username: self.username,
      });
    }

    debugLog('✅ Found me', toSafeLog(self));

    return self;
  }
}
