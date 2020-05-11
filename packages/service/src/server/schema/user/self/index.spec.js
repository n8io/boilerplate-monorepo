/* eslint-disable max-nested-callbacks */
import { User, UserSnapshot } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { subMinutes } from 'date-fns/fp';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';

describe('user self query', () => {
  const id = 'ID';
  const variables = { id };

  const query = gql`
    query UserSelf {
      userSelf {
        id
        email
        familyName
        givenName
        role
        username
      }
    }
  `;

  describe('when not authenticated', () => {
    const currentUser = null;

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(
        makeContext({ user: currentUser })
      ));
    });

    test(`returns a ${ErrorType.FORBIDDEN} error`, async () => {
      const response = await execMutation({ query, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.FORBIDDEN);
    });
  });

  describe('when user is authenticated', () => {
    const currentUser = User.apiExample();

    describe('and user loader fails', () => {
      const load = jest
        .fn()
        .mockName('loader.user')
        .mockImplementation(() => {
          throw new Error('db go boom');
        });

      const userLoader = { load };

      const loaders = { user: userLoader };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ loaders, user: currentUser })
        ));
      });

      test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
        const response = await execMutation({ query, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
      });
    });

    describe('and user not found', () => {
      const load = jest.fn().mockName('loader.user').mockResolvedValue(null);

      const userLoader = { load };
      const loaders = { user: userLoader };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ loaders, user: currentUser })
        ));
      });

      test(`returns a ${ErrorType.USER_SELF_FETCH_FAILED} error`, async () => {
        const response = await execMutation({ query, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.USER_SELF_FETCH_FAILED);
      });
    });

    describe('and user is found', () => {
      describe('and user is active', () => {
        const load = jest
          .fn()
          .mockName('loader.user')
          .mockResolvedValue(currentUser);

        const userLoader = { load };
        const loaders = { user: userLoader };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ loaders, user: currentUser })
          ));
        });

        test('returns user self', async () => {
          const response = await execMutation({ query, variables });
          const actual = responseToData(response);
          const expected = UserSnapshot.make(currentUser);

          expect(actual).toEqual(expected);
        });
      });

      describe('and user is not active', () => {
        const inThePast = subMinutes(1, new Date());
        const deletedUser = { ...currentUser, deletedAt: inThePast };

        const load = jest
          .fn()
          .mockName('loader.user')
          .mockResolvedValue(deletedUser);

        const userLoader = { load };
        const loaders = { user: userLoader };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ loaders, user: currentUser })
          ));
        });

        test(`returns a ${ErrorType.USER_DELETED} error`, async () => {
          const response = await execMutation({ query, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.USER_DELETED);
        });
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
