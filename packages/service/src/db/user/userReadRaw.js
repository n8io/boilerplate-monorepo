import { Db } from 'types/db';

const userReadRaw = async ({ email, id, username }, context) => {
  const { User } = context.Models;

  // eslint-disable-next-line sort-keys
  const input = { id, username, email };
  const [firstPair] = Object.entries(input).filter(([_k, v]) => Boolean(v));
  const [key, value] = firstPair;
  const user = await new User({ [key]: value }).fetch({ require: false });

  return Db.dbToApi(user && user.toJSON());
};

export { userReadRaw };
