import { Pagination } from '@boilerplate-monorepo/common';
import { Models } from 'models';
import { clamp, defaultTo, map, pipe } from 'ramda';

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

  const { models, pagination } = await Models.User.collection()
    .where(function where() {
      if (includeDeleted) return;

      this.where('deleted_at', null).orWhere('deleted_at', '>', 'NOW()');
    })
    .orderBy('family_name')
    .orderBy('given_name')
    .orderBy('id')
    .fetchCursorPage({ after, limit });

  const users = map((m) => m.toJSON(), models);

  return { pagination, users };
};

export { readRaw };
