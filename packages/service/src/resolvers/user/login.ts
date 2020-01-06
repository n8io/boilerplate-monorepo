import { compare } from 'bcryptjs';
import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { Context } from 'types/context';
import {
  UserInvalidLoginError,
  UserInvalidLoginPasswordMismatchError,
  UserInvalidLoginUserDeletedError,
  UserInvalidLoginUserNotFoundError,
} from 'types/customError/user/login';
import { InternalErrorMessage } from 'types/errorMessage';

const debugLog = logFactory({ method: 'userLogin', module: 'resolvers/user' });
const LOGIN_USER_INPUT_DESCRIPTION = 'The user login input';

@InputType({ description: LOGIN_USER_INPUT_DESCRIPTION })
class UserLoginInput {
  @Field({ description: `The user's username` })
  username: string;

  @Field({ description: `The user's clear text password` })
  password: string;
}

@Resolver()
export class UserLogin {
  @Mutation(() => String, { description: 'Login a given user' })
  async userLogin(
    @Arg('input', { description: LOGIN_USER_INPUT_DESCRIPTION })
    input: UserLoginInput,
    @Ctx() { res }: Context
  ): Promise<String> {
    const { username, password: clearTextPassword } = input;
    let user;

    debugLog('👾 LoginInput', { username });

    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      log.error(InternalErrorMessage.USER_NOT_FOUND, {
        error,
        mutation: this.userLogin.name,
        username,
      });

      throw new UserInvalidLoginError();
    }

    if (!user) {
      debugLog(`🤷 ${InternalErrorMessage.USER_NOT_FOUND}`, { username });

      throw new UserInvalidLoginUserNotFoundError({ username });
    }

    if (!Auth.isUserActive(user)) {
      log.error(InternalErrorMessage.USER_IS_DELETED, {
        deleted_at: user.deletedAt,
        query: this.userLogin.name,
        username: user.username,
      });

      throw new UserInvalidLoginUserDeletedError({
        deleted_at: user.deletedAt,
        username: user.username,
      });
    }

    const isPasswordMatch = await compare(clearTextPassword, user.passwordHash);

    if (!isPasswordMatch) {
      debugLog(`🔏 ${InternalErrorMessage.PASSWORD_MISMATCH}`, { username });

      throw new UserInvalidLoginPasswordMismatchError({ username });
    }

    debugLog(`✅ User logged in successfully`, { username });
    Auth.writeRefreshToken(res, user);

    return Auth.encryptAccessToken(user);
  }
}
