import { User as UserType } from '@boilerplate-monorepo/common';
import { Models } from 'models';
import { map } from 'ramda';

const read = async (ids) => {
  const users = await Models.User.forge()
    .where('id', 'IN', ids)
    .query((qb) =>
      qb.where('deleted_at', null).orWhere('deleted_at', '>', 'NOW()')
    )
    .fetchAll()
    .then((models) => models.toJSON());

  return map(UserType.dbToApi, users);
};

export { read };
