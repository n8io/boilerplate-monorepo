import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from 'type-graphql';
import { Context } from 'types/context';
import { DatabaseError } from 'types/customError';
import { UserSelfUpdateNotFoundError } from 'types/customError/user/selfUpdate';
import { InternalErrorMessage } from 'types/errorMessage';

const debugLog = logFactory({
  method: 'userRegister',
  module: 'resolvers/user',
});

const USER_SELF_UPDATE_INPUT = 'The current user self update input';

@InputType({ description: USER_SELF_UPDATE_INPUT })
class UserSelfUpdateInput {
  @Field({ description: `The current user's email` })
  email: string;
}

@Resolver()
export class UserSelfUpdate {
  @Mutation(() => Boolean, { description: `Update current user` })
  @Authorized()
  async userSelfUpdate(
    @Arg('input', { description: USER_SELF_UPDATE_INPUT })
    input: UserSelfUpdateInput,
    @Ctx() { user }: Context
  ) {
    const { email } = input;
    const { id, username } = user!;

    debugLog('👾 UserSelfUpdate', { email });

    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_RETRIEVE_SELF, {
        error,
        mutation: this.userSelfUpdate.name,
      });

      throw new DatabaseError();
    }

    let result = null;
    try {
      result = await User.update(id, { email });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, {
        email,
        error,
        id,
        mutation: this.userSelfUpdate.name,
      });

      throw new DatabaseError();
    }

    const { affected } = result;

    if (affected === 0) {
      log.error(InternalErrorMessage.FAILED_TO_UPDATE_SELF_NOT_FOUND, {
        email,
        id,
      });

      throw new UserSelfUpdateNotFoundError();
    }

    debugLog(`✅ Successfully updated user self`, { email, id });

    return true;
  }
}
