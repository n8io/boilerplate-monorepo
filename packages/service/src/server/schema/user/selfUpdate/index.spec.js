import { User, UserSnapshot } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';

describe('user self profile update mutation', () => {
  const { email, givenName } = User.apiExample();
  const input = { email, givenName };
  const variables = { input };

  const mutation = gql`
    mutation UserSelfUpdate($input: UserSelfUpdateInput!) {
      userSelfUpdate(input: $input) {
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

    test(`returns a ${ErrorType.FORBIDDEN} error`, async () => {
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.FORBIDDEN);
    });
  });

  describe('when user is authenticated', () => {
    const currentUser = User.apiExample();

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
