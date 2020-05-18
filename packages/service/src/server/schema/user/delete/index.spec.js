import { User, UserRole } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';

describe('user delete mutation', () => {
  const mutation = gql`
    mutation userDelete($id: ID!) {
      userDelete(id: $id)
    }
  `;

  describe('when not authenticated', () => {
    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ user: null })));
    });

    test(`returns a ${ErrorType.UNAUTHENTICATED} error`, async () => {
      const id = 'ID';
      const variables = { id };
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.UNAUTHENTICATED);
    });
  });

  describe('when authenticated', () => {
    let execMutation = null;

    describe('and has permission', () => {
      const user = User.apiExample({ role: UserRole.ADMIN });

      const save = jest
        .fn()
        .mockName('save')
        .mockResolvedValue({ deletedAt: new Date() });

      const db = { user: { save } };
      const context = makeContext({ db, user });

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(context));
      });

      describe('and tries to delete self', () => {
        // eslint-disable-next-line max-nested-callbacks
        test(`returns a ${ErrorType.SELF_DELETE} error`, async () => {
          const variables = { id: user.id };
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.SELF_DELETE);
        });
      });

      describe('and tries to delete another user', () => {
        const otherUserId = 'OTHER_USER_ID';

        // eslint-disable-next-line max-nested-callbacks
        test(`returns true`, async () => {
          const variables = { id: otherUserId };
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);

          expect(actual).toEqual(true);
        });

        // eslint-disable-next-line max-nested-callbacks
        describe('and there is the database throws an error', () => {
          const saveError = jest.fn().mockName('save').mockRejectedValue();

          const dbError = { user: { save: saveError } };
          const contextError = makeContext({ db: dbError, user });

          // eslint-disable-next-line max-nested-callbacks
          beforeEach(() => {
            ({ execMutation } = makeGraphqlClient(contextError));
          });

          // eslint-disable-next-line max-nested-callbacks
          test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
            const variables = { id: otherUserId };
            const response = await execMutation({ mutation, variables });
            const errorCode = responseToErrorCode(response);

            expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
          });
        });
      });
    });

    describe('and does not have permission', () => {
      const user = User.apiExample({ role: UserRole.USER });

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(makeContext({ user })));
      });

      test(`returns a ${ErrorType.FORBIDDEN} error`, async () => {
        const variables = { id: user.id };
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.FORBIDDEN);
      });
    });
  });
});
