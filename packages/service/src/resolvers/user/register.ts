import { hash } from 'bcryptjs';
import cuid from 'cuid';
import { User } from 'entity/User';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import {
  DatabaseError,
  RegisterUserAlreadyExistsError,
} from 'types/customError';
import { InternalErrorMessage } from 'types/errorMessage';
import { PasswordSalt } from 'types/passwordSalt';
import { UserRole } from 'types/userRole';

const debugLog = logFactory({
  method: 'userRegister',
  module: 'resolvers/user',
});

const REGISTER_USER_INPUT_DESCRIPTION = 'The register user input';

@InputType({ description: REGISTER_USER_INPUT_DESCRIPTION })
class UserRegisterInput {
  @Field({ description: `The new user's email` })
  email: string;

  @Field({ description: `The new user's clear text password` })
  password: string;

  @Field({ description: `The new user's authorization level` })
  role?: UserRole;

  @Field({ description: `The new user's username` })
  username: string;
}

@Resolver()
export class UserRegister {
  @Mutation(() => Boolean, { description: `Register a new user` })
  async userRegister(
    @Arg('input', { description: REGISTER_USER_INPUT_DESCRIPTION })
    input: UserRegisterInput
  ) {
    const { password: clearTextPassword, email, role, username } = input;
    const salt = await PasswordSalt.generate();
    const passwordHash = await hash(clearTextPassword, salt);
    let user;

    debugLog('👾 RegisterInput', {
      email,
      password: '*** redacted ***',
      role,
      username,
    });

    try {
      user = await User.findOne({ where: [{ email }, { username }] });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
        error,
        mutation: this.userRegister.name,
      });

      throw new DatabaseError();
    }

    if (user) {
      log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
        existing: Auth.toSafeLog(user),
        mutation: this.userRegister.name,
        requested: { email, username },
      });

      throw new RegisterUserAlreadyExistsError({ email, username });
    }

    const id = cuid();

    try {
      await User.insert({
        id,
        email,
        passwordHash,
        role,
        username,
      });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
        email,
        error,
        mutation: this.userRegister.name,
        username,
      });

      throw new DatabaseError();
    }

    debugLog(`✅ Successfully registered user`, { email, id, username });

    return true;
  }
}
