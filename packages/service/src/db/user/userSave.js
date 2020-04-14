import { User } from '@boilerplate-monorepo/common';

const userSave = async (user, context) => {
  const { User: UserModel } = context.Models;
  const dbUser = User.apiToDb(user);
  const { id, ...rest } = dbUser;

  const result = await new UserModel({ id })
    .save(rest, { method: 'update', patch: true, required: false })
    .then(model => model.toJSON());

  return User.dbToApi(result);
};

export { userSave };
