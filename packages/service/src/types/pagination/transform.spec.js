import { prop } from 'ramda';
import { Pagination } from 'types/pagination';
import { cursorExample, nodeExample, paginationExample } from './examples';

describe('pagination transforms', () => {
  describe('cursorToAfter', () => {
    test('transforms cursor to after', () => {
      const cursor = cursorExample();

      expect(Pagination.cursorToAfter(cursor)).toEqual([
        'Clark',
        'Nate',
        'ck967oo8q00000ofk47d37eww',
      ]);
    });
  });

  describe('nodesToPaginatedResults', () => {
    test('transforms nodes to paginated results', () => {
      const nodes = [
        nodeExample({ id: 'NODE_1' }),
        nodeExample({ id: 'NODE_2' }),
        nodeExample({ id: 'NODE_3' }),
      ];

      const pagination = paginationExample({ rowCount: nodes.length });
      const nodeToCursor = prop('id');

      const actual = Pagination.nodesToPaginatedResults(
        nodes,
        pagination,
        nodeToCursor
      );

      expect(actual).toMatchObject({
        edges: nodes.map((node) => ({
          node,
        })),
        pageInfo: {
          hasNextPage: pagination.hasMore,
          total: pagination.rowCount,
        },
      });

      actual.edges.forEach((node) => expect(node).toHaveProperty('cursor'));
    });
  });
});
