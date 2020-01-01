import { User } from 'entity/User';
import { Query, Resolver, UseMiddleware, Ctx } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';

@Resolver()
export class Me {
  @Query(() => User, {
    description: 'Fetch the authenticated user',
    nullable: true,
  })
  @UseMiddleware(Auth.isAuthenticated)
  me(@Ctx() { token }: Context) {
    return User.findOne({ id: token!.id });
  }
}
