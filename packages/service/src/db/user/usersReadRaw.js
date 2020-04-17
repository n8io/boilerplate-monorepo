import { clamp, defaultTo, identity, map, pipe } from 'ramda';
import { Pagination } from 'types/pagination';

const usersReadRaw = async (
  { after: tempAfter, includeDeleted = true, first },
  context
) => {
  const { User } = context.Models;
  const after = Pagination.cursorToAfter(tempAfter);

  const limit = pipe(
    defaultTo(Pagination.PAGE_SIZE_DEFAULT),
    clamp(1, Pagination.MAX_PAGE)
  )(first);

  const whereClause = includeDeleted
    ? identity
    : // eslint-disable-next-line camelcase
      qb => qb.where({ deleted_at: null }).orWhere('deleted_at', '>', 'NOW()');

  const { models, pagination } = await User.collection()
    .query(whereClause)
    .orderBy('family_name')
    .orderBy('given_name')
    .orderBy('id')
    .fetchCursorPage({ after, limit });

  const users = map(m => m.toJSON(), models);

  return { pagination, users };
};

export { usersReadRaw };
