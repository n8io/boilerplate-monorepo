import { any, isNil, toLower, unless } from 'ramda';

const toLowercase = unless(isNil, toLower);

const userReadRaw = async (input, context) => {
  const { User } = context.Models;

  const {
    email: tempEmail = null,
    id = null,
    includeDeleted,
    passwordResetToken = null,
    username: tempUsername = null,
  } = input;

  const [email, username] = [toLowercase(tempEmail), toLowercase(tempUsername)];

  // eslint-disable-next-line complexity,max-statements
  const whereByKey = qb => {
    const hasAtLeastOneKey = any(Boolean, [
      email,
      id,
      passwordResetToken,
      username,
    ]);

    if (!hasAtLeastOneKey) return qb.where({ id: null }); // Will never return any rows

    if (!includeDeleted) {
      qb.where(builder =>
        // eslint-disable-next-line camelcase
        builder.where({ deleted_at: null }).orWhere('deleted_at', '>', 'NOW()')
      );
    }

    if (id) {
      return qb.andWhere({ id });
    }

    if (email && username) {
      qb.where(builder => builder.where({ email }).orWhere({ username }));
    } else if (email) {
      qb.where({ email });
    } else if (username) {
      qb.where({ username });
    }

    if (passwordResetToken) {
      // eslint-disable-next-line camelcase
      qb.where({ password_reset_token: passwordResetToken });
    }

    return qb;
  };

  const {
    models: [user],
  } = await User.collection()
    .query(whereByKey)
    .fetch();

  return user ? user.toJSON() : null;
};

export { userReadRaw };
