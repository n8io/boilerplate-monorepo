import { ObjectType, Field, InputType } from 'type-graphql';
import { Page } from 'types/pagination/page';
import { User } from 'entity/User';

@InputType({ description: 'The filters for searching users' })
export class UsersInput {
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
export class UserPage extends Page(User) {}
