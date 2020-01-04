import { hash } from 'bcryptjs';
import cuid from 'cuid';
import { User } from 'entity/User';
import { log } from 'logger';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { Auth } from 'types/auth';
import { InternalErrorMessage } from 'types/errorMessage';
import { PasswordSalt } from 'types/passwordSalt';
import { UserRole } from 'types/userRole';

const REGISTER_USER_INPUT_DESCRIPTION = 'The register user input';

@InputType({ description: REGISTER_USER_INPUT_DESCRIPTION })
class RegisterInput {
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
export class Register {
  @Mutation(() => Boolean, { description: `Register a new user` })
  async register(
    @Arg('input', { description: REGISTER_USER_INPUT_DESCRIPTION })
    input: RegisterInput
  ) {
    const { password: clearTextPassword, email, role, username } = input;
    const passwordHash = await hash(clearTextPassword, PasswordSalt);
    let user;

    try {
      user = await User.findOne({ where: [{ email }, { username }] });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, error);

      return false;
    }

    if (user) {
      log.error(InternalErrorMessage.FAILED_TO_REGISTER_USER, {
        existing: Auth.toSafeLog(user),
        requested: { email, username },
      });
      return false;
    }

    try {
      await User.insert({
        id: cuid(),
        email,
        passwordHash,
        role,
        username,
      });
    } catch (error) {
      log.error(InternalErrorMessage.FAILED_DB_REQUEST, error);

      return false;
    }

    return true;
  }
}
