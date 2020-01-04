import { User } from 'entity/User';
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Auth } from 'types/auth';
import { paginate } from 'types/pagination/paginate';
import { UserPage, UsersInput } from 'types/users';

@Resolver()
export class Users {
  @Query(() => UserPage, { description: 'Fetch all users' })
  @UseMiddleware(Auth.isAuthenticated)
  async users(
    @Arg('input', { description: 'The filters for searching users' })
    input: UsersInput
  ) {
    return paginate(User, input, 'username');
  }
}
