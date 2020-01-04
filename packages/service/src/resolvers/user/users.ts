import { User } from 'entity/User';
import {
  Arg,
  Authorized,
  Query,
  Resolver,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import { paginate } from 'types/pagination/paginate';
import { UserRole } from 'types/userRole';
import { Page } from 'types/pagination/page';

@InputType({ description: 'The filters for searching users' })
class UsersInput {
  @Field({
    description:
      'The starting cursor. E.g test@test.com if indexed by email or test_user if indexed by username',
    nullable: true,
  })
  after: string;

  @Field({ description: 'The desired page size', nullable: true })
  first: number;
}

@ObjectType({ description: 'A User page' })
class UserPage extends Page(User) {}

@Resolver()
export class Users {
  @Query(() => UserPage, { description: 'Fetch all users' })
  @Authorized([UserRole.ADMIN])
  async users(
    @Arg('input', { description: 'The filters for searching users' })
    input: UsersInput
  ) {
    return paginate(User, input, 'username');
  }
}
