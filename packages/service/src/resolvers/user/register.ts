import { hash } from 'bcryptjs';
import cuid from 'cuid';
import { Arg, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { PasswordSalt } from '../../types/passwordSalt';
import { Auth } from '../../types/auth';

const REGISTER_USER_INPUT_DESCRIPTION = 'The register user input';

@InputType({ description: REGISTER_USER_INPUT_DESCRIPTION })
class RegisterInput {
  @Field({ description: `The new user's email` })
  email: string;

  @Field({ description: `The new user's clear text password` })
  password: string;

  @Field({ description: `The new user's username` })
  username: string;
}

@Resolver()
export class Register {
  @Mutation(() => Boolean, { description: `Register a new user` })
  async register(
    @Arg('input', { description: REGISTER_USER_INPUT_DESCRIPTION })
    registerInput: RegisterInput
  ) {
    const { password: clearTextPassword, email, username } = registerInput;
    const passwordHash = await hash(clearTextPassword, PasswordSalt);
    const user = await User.findOne({ where: [{ email }, { username }] });

    if (user) {
      console.error(
        '🛑 Failed to register user. The given username and/or email already exists',
        {
          existing: Auth.toSafeLog(user),
          requested: { email, username },
        }
      );
      return false;
    }

    try {
      await User.insert({
        id: cuid(),
        email,
        passwordHash,
        username,
      });
    } catch (err) {
      console.error('🛑', err);

      return false;
    }

    return true;
  }
}
