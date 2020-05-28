import { User, UserSnapshot } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { toUniqueIndexName } from 'db/migrate/utils';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { Db } from 'types/db';
import { ErrorType } from 'types/errorType';

describe('user self profile update mutation', () => {
  const { email, givenName } = User.apiExample();
  const input = { email, givenName };
  const variables = { input };

  const mutation = gql`
    mutation UserSelfProfileUpdate($input: UserSelfProfileUpdateInput!) {
      userSelfProfileUpdate(input: $input) {
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
    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ user: null })));
    });

    test(`returns a ${ErrorType.UNAUTHENTICATED} error`, async () => {
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.UNAUTHENTICATED);
    });
  });

  describe('when user is authenticated', () => {
    const currentUser = User.apiExample();

    describe('and new user email is already taken', () => {
      const uniqueEmailIndex = toUniqueIndexName(Db.Table.USERS, 'email');

      const save = jest
        .fn()
        .mockName('save')
        .mockImplementation(() => {
          throw new Error(`'"${uniqueEmailIndex}"'`);
        });

      const db = { user: { save } };
      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ db, user: currentUser })
        ));
      });

      test(`returns a ${ErrorType.USER_SELF_PROFILE_UPDATE_FAILED_EMAIL_IN_USE} error`, async () => {
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(
          ErrorType.USER_SELF_PROFILE_UPDATE_FAILED_EMAIL_IN_USE
        );
      });
    });

    describe('and user save fails', () => {
      const save = jest
        .fn()
        .mockName('save')
        .mockImplementation(() => {
          throw new Error('db go boom');
        });

      const db = { user: { save } };
      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ db, user: currentUser })
        ));
      });

      test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
      });
    });

    describe('the user self update', () => {
      const save = jest.fn().mockName('save').mockResolvedValue(currentUser);

      const db = { user: { save } };
      const clear = jest.fn().mockName('clear');
      const userLoader = { clear };
      const loaders = { user: userLoader };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ db, loaders, user: currentUser })
        ));
      });

      test('saves the user self profile', async () => {
        await execMutation({ mutation, variables });

        expect(save).toHaveBeenCalledWith({ ...input, id: currentUser.id });
      });

      test('clears user loader', async () => {
        await execMutation({ mutation, variables });

        expect(clear).toHaveBeenCalledWith(currentUser.id);
      });

      test('returns user self', async () => {
        const response = await execMutation({ mutation, variables });
        const actual = responseToData(response);
        const expected = UserSnapshot.make(currentUser);

        expect(actual).toEqual(expected);
      });
    });
  });
});
