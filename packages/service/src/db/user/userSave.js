import { Db } from 'types/db';

const userSave = async (user, context) => {
  const { User } = context.Models;
  const dbUser = Db.apiToDb(user);
  const { id, ...rest } = dbUser;

  const result = await new User({ id })
    .save(rest, { method: 'update', patch: true, required: false })
    .then(model => model.toJSON());

  return Db.dbToApi(result);
};

export { userSave };
