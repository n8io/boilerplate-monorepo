import { User } from 'entity/User';
import { log } from 'logger';
import { Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Context } from 'types/context';
import { InternalErrorMessage } from 'types/errorMessage';
import { UserRole } from 'types/userRole';

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
  me(@Ctx() { user }: Context) {
    if (!user) return null;

    try {
      return User.findOne({ id: user!.id });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, { query: 'me', error });

      return null;
    }
  }
}
