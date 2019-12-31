import { hash } from 'bcryptjs';
import cuid from 'cuid';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { PasswordSalt } from '../../types/passwordSalt';

@Resolver()
export class Register {
  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const passwordHash = await hash(password, PasswordSalt);

    try {
      await User.insert({
        id: cuid(),
        email,
        password: passwordHash,
      });
    } catch (err) {
      console.error(err);

      return false;
    }

    return true;
  }
}
