/* eslint-disable max-nested-callbacks */
import {
  Pagination,
  User,
  UserRole,
  UserSnapshot,
} from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';
import { toUserCursor } from './index';

describe('users query', () => {
  const after = null;
  const first = 3;
  const input = { after, first };
  const variables = { input };

  const query = gql`
    query Users($input: PaginationInput!) {
      users(input: $input) {
        edges {
          cursor
          node {
            email
            familyName
            givenName
            id
            role
            username
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          total
        }
      }
    }
  `;

  describe('when not authenticated', () => {
    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ user: null })));
    });

    test(`returns a ${ErrorType.UNAUTHENTICATED} error`, async () => {
      const response = await execMutation({ query, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.UNAUTHENTICATED);
    });
  });

  describe('when user is authenticated', () => {
    describe('and does not have permission', () => {
      const user = User.apiExample({ role: UserRole.USER });

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(makeContext({ user })));
      });

      test(`returns a ${ErrorType.FORBIDDEN} error`, async () => {
        const response = await execMutation({ query, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.FORBIDDEN);
      });
    });

    describe(`and has permission`, () => {
      const currentUser = User.apiExample({ role: UserRole.ADMIN });

      describe('and user save fails', () => {
        const readPaginated = jest
          .fn()
          .mockName('readPaginated')
          .mockImplementation(() => {
            throw new Error('db go boom');
          });

        const db = { users: { readPaginated } };
        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: currentUser })
          ));
        });

        test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
          const response = await execMutation({ query, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
        });
      });

      // eslint-disable-next-line max-statements
      describe('and successfully queries', () => {
        const user1 = User.apiExample({ id: 'ID_1' });
        const user2 = User.apiExample({ id: 'ID_2' });
        const users = [user1, user2];

        const pagination = {
          endCursor: toUserCursor(user2),
          hasMore: false,
          rowCount: users.length,
        };

        const usersWithPagination = {
          pagination,
          users,
        };

        const readPaginated = jest
          .fn()
          .mockName('readPaginated')
          .mockResolvedValue(usersWithPagination);

        const db = { users: { readPaginated } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: currentUser })
          ));
        });

        test('reads paginated users', async () => {
          await execMutation({ query, variables });

          expect(readPaginated).toHaveBeenCalledWith(input);
        });

        test('returns paginated users', async () => {
          const response = await execMutation({ query, variables });
          const actual = responseToData(response);

          const expected = Pagination.nodesToPaginatedResults(
            users.map(UserSnapshot.make),
            pagination,
            toUserCursor
          );

          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
