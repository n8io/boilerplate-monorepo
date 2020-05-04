import { Models } from 'models';
import { clamp, defaultTo, identity, map, pipe } from 'ramda';
import { Pagination } from 'types/pagination';

const readRaw = async ({
  after: tempAfter,
  first,
  includeDeleted = true,
} = {}) => {
  const after = Pagination.cursorToAfter(tempAfter);

  const limit = pipe(
    defaultTo(Pagination.PAGE_SIZE_DEFAULT),
    clamp(1, Pagination.MAX_PAGE)
  )(first);

  const whereClause = includeDeleted
    ? identity
    : qb => qb.where('deleted_at', null).orWhere('deleted_at', '>', 'NOW()');

  const { models, pagination } = await Models.User.collection()
    .query(whereClause)
    .orderBy('family_name')
    .orderBy('given_name')
    .orderBy('id')
    .fetchCursorPage({ after, limit });

  const users = map(m => m.toJSON(), models);

  return { pagination, users };
};

export { readRaw };
