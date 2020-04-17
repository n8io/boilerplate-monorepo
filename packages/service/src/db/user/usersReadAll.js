import { map } from 'ramda';

const usersReadAll = (ids, context) => {
  const { User } = context.Models;

  const { models: users } = User.collection()
    .where('id', 'IN', ids)
    .then(models => models.map(m => m.toJSON()));

  return map(User.dbToApi, users);
};

export { usersReadAll };
