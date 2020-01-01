import { compare } from 'bcryptjs';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { Auth } from '../../types/auth';
import { Context } from '../../types/context';

const INVALID_LOGIN = 'Invalid login';
const LOGIN_USER_INPUT_DESCRIPTION = 'The user login input';

@InputType({ description: LOGIN_USER_INPUT_DESCRIPTION })
class LoginInput {
  @Field({ description: `The user's username` })
  username: string;

  @Field({ description: `The user's clear text password` })
  password: string;
}

@Resolver()
export class Login {
  @Mutation(() => String, { description: 'Login a given user' })
  async login(
    @Arg('input', { description: LOGIN_USER_INPUT_DESCRIPTION })
    loginInput: LoginInput,
    @Ctx() { res }: Context
  ): Promise<String> {
    const { username, password: clearTextPassword } = loginInput;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error('🛑 User does not exist', { username });

      throw new Error(INVALID_LOGIN);
    }

    const isPasswordMatch = await compare(clearTextPassword, user.passwordHash);

    if (!isPasswordMatch) {
      console.error('🛑 Provided password does not match', { username });

      throw new Error(INVALID_LOGIN);
    }

    Auth.appendRefreshTokenToResponse(res, Auth.generateRefreshToken(user));

    return Auth.generateAccessToken(user);
  }
}
