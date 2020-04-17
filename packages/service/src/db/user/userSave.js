import { User as UserType } from '@boilerplate-monorepo/common';

const userSave = async (user, context) => {
  const { User } = context.Models;
  const dbUser = UserType.apiToDb(user);
  const { id, ...rest } = dbUser;

  const result = await new User({ id })
    .save(rest, { method: 'update', patch: true, required: false })
    .then(model => model.toJSON());

  return User.dbToApi(result);
};

export { userSave };
