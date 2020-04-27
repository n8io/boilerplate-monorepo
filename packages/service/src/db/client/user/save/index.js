import { User } from '@boilerplate-monorepo/common';
import { Models } from 'models';

const save = async user => {
  const dbUser = User.apiToDb(user);
  const { id, ...rest } = dbUser;

  const result = await Models.User.forge({ id })
    .save(rest, { method: 'update', patch: true, required: false })
    .then(model => model.toJSON());

  return User.dbToApi(result);
};

export { save };
