import { compare } from 'bcryptjs';
import { User } from 'entity/User';
import { log } from 'logger';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';
import { InternalErrorMessage, PublicErrorMessage } from 'types/errorMessage';
import { AuthenticationError } from 'apollo-server-express';

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
    let user;

    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, error);

      throw new AuthenticationError(PublicErrorMessage.INVALID_LOGIN);
    }

    if (!user) {
      log.error(InternalErrorMessage.USER_NOT_FOUND, { username });

      throw new AuthenticationError(PublicErrorMessage.INVALID_LOGIN);
    }

    const isPasswordMatch = await compare(clearTextPassword, user.passwordHash);

    if (!isPasswordMatch) {
      log.error(InternalErrorMessage.PASSWORD_MISMATCH, { username });

      throw new AuthenticationError(PublicErrorMessage.INVALID_LOGIN);
    }

    Auth.writeRefreshToken(res, user);

    return Auth.encryptAccessToken(user);
  }
}
