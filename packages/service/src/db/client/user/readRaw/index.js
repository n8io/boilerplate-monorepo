import { Models } from 'models';
import { any, isNil, toLower, unless } from 'ramda';

const toLowercase = unless(isNil, toLower);

const readRaw = async ({
  email: tempEmail = null,
  id = null,
  includeDeleted,
  passwordResetToken = null,
  username: tempUsername = null,
} = {}) => {
  const [email, username] = [toLowercase(tempEmail), toLowercase(tempUsername)];

  const hasAtLeastOneKey = any(Boolean, [
    email,
    id,
    passwordResetToken,
    username,
  ]);

  if (!hasAtLeastOneKey) return null;

  // eslint-disable-next-line complexity,max-statements
  const whereByKey = qb => {
    if (!includeDeleted) {
      qb.where(builder =>
        builder.where('deleted_at', null).orWhere('deleted_at', '>', 'NOW()')
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
      qb.where('password_reset_token', passwordResetToken);
    }

    return qb;
  };

  const {
    models: [user],
  } = await Models.User.collection()
    .query(whereByKey)
    .fetch();

  return user ? user.toJSON() : null;
};

export { readRaw };
