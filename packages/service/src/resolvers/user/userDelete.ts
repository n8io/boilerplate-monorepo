import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Context } from 'types/context';
import {
  SelfDeleteError,
  UserDeleteError,
} from 'types/customError/user/userDelete';
import { InternalErrorMessage } from 'types/errorMessage';
import { UserRole } from 'types/userRole';
import { DatabaseError } from 'types/customError/database';

const debugLog = logFactory({
  method: 'userDelete',
  module: 'resolvers/user',
});

@Resolver()
export class UserDelete {
  @Authorized([UserRole.ADMIN])
  @Mutation(() => Boolean, {
    description: 'Delete a user',
  })
  async userDelete(
    @Arg('id', {
      description: 'The user id of the user to delete',
    })
    id: string,
    @Ctx() { user }: Context
  ) {
    debugLog('👾 User id', id);

    if (user!.id === id) {
      log.error(InternalErrorMessage.USER_ATTEMPTED_TO_SELF_DELETE, {
        username: user!.username,
      });

      throw new SelfDeleteError({ username: user!.username });
    }

    let wasUpdated = false;

    try {
      const { affected } = await getConnection()
        .getRepository(User)
        .update({ id }, { deletedAt: new Date() });

      wasUpdated = Boolean(affected);
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_DELETE_USER, {
        id,
        error,
        mutation: 'userDelete',
      });

      throw new DatabaseError();
    }

    if (!wasUpdated) {
      log.error(InternalErrorMessage.FAILED_TO_DELETE_USER, id);

      throw new UserDeleteError({ id });
    }

    debugLog('✅ Successfully deleted user', id);

    return true;
  }
}
