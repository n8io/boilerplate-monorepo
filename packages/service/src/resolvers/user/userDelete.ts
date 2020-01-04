import { ApolloError } from 'apollo-server-express';
import { User } from 'entity/User';
import { log } from 'logger';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Context } from 'types/context';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { UserRole } from 'types/userRole';

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
    if (user!.id === id) {
      log.error(InternalErrorMessage.USER_ATTEMPTED_TO_SELF_DELETE, {
        username: user!.username,
      });

      throw new ApolloError(
        PublicErrorMessage.CANNOT_DELETE_SELF,
        'CANNOT_SELF_DELETE',
        { username: user!.username }
      );
    }

    try {
      const { affected } = await getConnection()
        .getRepository(User)
        .update({ id }, { deletedAt: new Date() });

      const wasUpdated = Boolean(affected);

      if (!wasUpdated) {
        log.error(InternalErrorMessage.FAILED_TO_DELETE_USER, id);
      }

      return wasUpdated;
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, {
        error,
        mutation: 'userDelete',
      });

      return false;
    }
  }
}
