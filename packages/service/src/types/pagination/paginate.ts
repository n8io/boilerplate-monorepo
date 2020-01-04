import { clamp } from 'ramda';
import { ClassType } from 'type-graphql';
import { getConnection } from 'typeorm';
import { PaginationInput } from './input';

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export async function paginate<T, K extends keyof T>(
  ItemType: ClassType<T>,
  input: PaginationInput,
  cursorProp: K
) {
  const ALIAS = ItemType.name;
  const { after, first } = input;
  const pageSize = !first ? DEFAULT_PAGE_SIZE : clamp(1, MAX_PAGE_SIZE, first);

  const items = (await getConnection()
    .getRepository(ItemType)
    .createQueryBuilder(ALIAS)
    .take(pageSize)
    .orderBy(`${ALIAS}.${cursorProp}`)
    .where(after ? `${ALIAS}.${cursorProp} > :after` : '1 = :after', {
      after: after || '1',
    })
    .getMany()) as T[];

  const hasItems = items.length > 0;
  const endCursor = hasItems ? items[items.length - 1][cursorProp] : null;
  let hasNextPage = false;

  if (hasItems) {
    hasNextPage = !!(await getConnection()
      .getRepository(ItemType)
      .createQueryBuilder(ALIAS)
      .take(1)
      .where(`${ALIAS}.${cursorProp} > :after`, { after: endCursor })
      .orderBy(`${ALIAS}.${cursorProp}`)
      .getCount());
  }

  return {
    edges: items.map(T => ({
      node: T,
      cursor: T[cursorProp],
    })),
    pageInfo: {
      endCursor,
      hasNextPage,
    },
  };
}
