/* eslint-disable max-nested-callbacks */
import { User, UserRole } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';

describe('user revoke refresh tokens mutation', () => {
  const id = 'ID';
  const variables = { id };

  const mutation = gql`
    mutation UserRevokeRefreshTokens($id: ID!) {
      userRevokeRefreshTokens(id: $id)
    }
  `;

  describe('when user is not authenticated', () => {
    const currentUser = null;

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(
        makeContext({ user: currentUser })
      ));
    });

    test(`returns a ${ErrorType.UNAUTHENTICATED} error`, async () => {
      const response = await execMutation({ mutation, variables });
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
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.FORBIDDEN);
      });
    });

    describe(`and has permission`, () => {
      const adminUser = User.apiExample({ role: UserRole.ADMIN });

      describe('and revoke refresh tokens updated a record', () => {
        const revokeRefreshTokens = jest
          .fn()
          .mockName('revokeRefreshTokens')
          .mockResolvedValue(true);

        const db = { user: { revokeRefreshTokens } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: adminUser })
          ));
        });

        test('returns true', async () => {
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);

          expect(actual).toEqual(true);
        });
      });

      describe('and revoke refresh tokens did not update anything', () => {
        const revokeRefreshTokens = jest
          .fn()
          .mockName('revokeRefreshTokens')
          .mockResolvedValue(false);

        const db = { user: { revokeRefreshTokens } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: adminUser })
          ));
        });

        test(`returns a ${ErrorType.FAILED_TO_REVOKE_USER_REFRESH_TOKENS} error`, async () => {
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(
            ErrorType.FAILED_TO_REVOKE_USER_REFRESH_TOKENS
          );
        });
      });

      describe('and db revokes refresh tokens fails', () => {
        const revokeRefreshTokens = jest
          .fn()
          .mockName('revokeRefreshTokens')
          .mockImplementation(() => {
            throw new Error('db go boom');
          });

        const db = { user: { revokeRefreshTokens } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: adminUser })
          ));
        });

        test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
        });
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
