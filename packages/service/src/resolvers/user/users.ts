import { PageInfo } from 'entity/PageInfo';
import { User } from 'entity/User';
import {
  Arg,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Auth } from 'types/auth';

const USERS_INPUT_DESCRIPTION = 'The filters for searching users';
const DEFAULT_PAGE_SIZE = 10;

@InputType({ description: USERS_INPUT_DESCRIPTION })
class UsersInput {
  @Field({ description: 'The starting cursor', nullable: true })
  after?: string;

  @Field({ description: 'The page size' })
  first: number = 10;
}

@ObjectType()
class UserEdge {
  @Field()
  node: User;

  @Field()
  cursor: string;
}

@ObjectType()
class UsersResponse {
  @Field(() => [UserEdge])
  edges: [UserEdge];

  @Field()
  pageInfo: PageInfo;
}

@Resolver()
export class Users {
  @Query(() => UsersResponse, { description: 'Fetch all users' })
  @UseMiddleware(Auth.isAuthenticated)
  async users(
    @Arg('input', { description: USERS_INPUT_DESCRIPTION })
    input: UsersInput
  ) {
    const ALIAS = 'user';
    const { after, first } = input;
    const pageSize = !first || first < 1 ? DEFAULT_PAGE_SIZE : first;

    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder(ALIAS)
      .take(pageSize)
      .orderBy(`${ALIAS}.username`)
      .where(after ? `${ALIAS}.username > :after` : '1 = :after', {
        after: after || '1',
      })
      .getMany();

    const hasUsers = users.length > 0;
    const endCursor = hasUsers
      ? users[users.length - 1].username
      : after || null;
    let nextUser: User | undefined;

    if (hasUsers) {
      nextUser = await getConnection()
        .getRepository(User)
        .createQueryBuilder(ALIAS)
        .take(1)
        .where(`${ALIAS}.username > :after`, { after: endCursor })
        .orderBy(`${ALIAS}.username`)
        .getOne();
    }

    return {
      edges: users.map(user => ({
        node: user,
        cursor: user.username,
      })),
      pageInfo: {
        endCursor,
        hasNextPage: Boolean(nextUser),
      },
    };
  }
}
