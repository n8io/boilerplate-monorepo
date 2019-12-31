import { compare } from 'bcryptjs';
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Auth } from '../../types/auth';
import { Context } from '../../types/context';

const INVALID_LOGIN = 'Invalid login';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class Login {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error(INVALID_LOGIN);
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error(INVALID_LOGIN);
    }

    res.cookie(
      Auth.JWT_REFRESH_TOKEN_COOKIE_NAME,
      Auth.generateRefreshToken(user),
      { httpOnly: true }
    );

    return {
      accessToken: Auth.generateAccessToken(user),
    };
  }
}
