import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { User } from '../../entity/User';
import { Auth } from '../../types/auth';

@Resolver()
export class Users {
  @Query(() => [User])
  @UseMiddleware(Auth.isAuthenticated)
  users() {
    return User.find();
  }
}
