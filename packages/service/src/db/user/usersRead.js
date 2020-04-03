import { User } from '@boilerplate-monorepo/common';
import { clamp, defaultTo, map, pipe } from 'ramda';
import { Pagination } from 'types/pagination';

const usersRead = async ({ after: tempAfter, first }, context) => {
  const { User: Model } = context.Models;
  const after = Pagination.cursorToAfter(tempAfter);

  const limit = pipe(
    defaultTo(Pagination.PAGE_SIZE_DEFAULT),
    clamp(1, Pagination.MAX_PAGE)
  )(first);

  const { models, pagination } = await Model.collection()
    .orderBy('family_name')
    .orderBy('given_name')
    .orderBy('id')
    .fetchCursorPage({ after, limit });

  const users = map(pipe(m => m.toJSON(), User.dbToApi))(models);

  return { pagination, users };
};

export { usersRead };
