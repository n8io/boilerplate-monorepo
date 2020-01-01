import { compare } from 'bcryptjs';
import { User } from 'entity/User';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';
import { PublicError, AuthError } from 'types/error';

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
    input: LoginInput,
    @Ctx() { res }: Context
  ): Promise<String> {
    const { username, password: clearTextPassword } = input;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.error(`🛑 ${AuthError.USER_DOES_NOT_EXIST}`, { username });

      throw new Error(PublicError.INVALID_LOGIN);
    }

    const isPasswordMatch = await compare(clearTextPassword, user.passwordHash);

    if (!isPasswordMatch) {
      console.error(`🛑 ${AuthError.PASSWORD_MISMATCH}`, { username });

      throw new Error(PublicError.INVALID_LOGIN);
    }

    Auth.writeRefreshToken(res, user);

    return Auth.encryptAccessToken(user);
  }
}
