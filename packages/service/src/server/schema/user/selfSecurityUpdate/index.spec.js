/* eslint-disable max-nested-callbacks */
import { User } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';
import { Password } from 'types/password';

describe('user self security update mutation', () => {
  const passwordCurrent = 'P4$$W0RD_CuRR3NT';
  const passwordNew = 'P4$$W0rD_N3W';
  const input = { passwordCurrent, passwordNew };
  const variables = { input };

  const mutation = gql`
    mutation UserSelfSecurityUpdate($input: UserSelfSecurityUpdateInput!) {
      userSelfSecurityUpdate(input: $input)
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

    describe('and user db lookup fails', () => {
      const readRaw = jest
        .fn()
        .mockName('readRaw')
        .mockImplementation(() => {
          throw new Error('db go boom');
        });

      const db = { user: { readRaw } };

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

    describe('and user is not found', () => {
      const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(null);

      const db = { user: { readRaw } };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(
          makeContext({ db, user: currentUser })
        ));
      });

      test(`returns a ${ErrorType.USER_SELF_FETCH_FAILED} error`, async () => {
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.USER_SELF_FETCH_FAILED);
      });
    });

    describe('and user is found', () => {
      const passwordHash = 'PASSWORD_HASH';
      const returnedUser = { ...currentUser, passwordHash };

      const readRaw = jest
        .fn()
        .mockName('readRaw')
        .mockResolvedValue(returnedUser);

      let execMutation = null;

      describe('and current password is not correct', () => {
        const db = { user: { readRaw } };

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: currentUser })
          ));

          const compare = td.replace(Password, 'compare');
          const notTheCurrentPassword = `${passwordCurrent}_INVALID`;

          td.when(compare(notTheCurrentPassword, passwordHash)).thenResolve(
            false
          );
        });

        test(`returns a ${ErrorType.FAILED_LOGIN} error`, async () => {
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.FAILED_LOGIN);
        });
      });

      describe('and current password is correct', () => {
        describe('and user save fails', () => {
          const save = jest
            .fn()
            .mockName('save')
            .mockImplementation(() => {
              throw new Error('db go boom');
            });

          const db = { user: { readRaw, save } };

          let compare = null;

          beforeEach(() => {
            ({ execMutation } = makeGraphqlClient(
              makeContext({ db, user: currentUser })
            ));

            compare = td.replace(Password, 'compare');
            const hash = td.replace(Password, 'hash');

            td.when(compare(passwordCurrent, passwordHash)).thenResolve(true);
            td.when(hash(passwordNew)).thenResolve(passwordHash);
          });

          test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
            const response = await execMutation({ mutation, variables });
            const errorCode = responseToErrorCode(response);

            expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
          });
        });

        // eslint-disable-next-line max-statements
        describe('and user save succeeds', () => {
          const passwordHashNew = 'PASSWORD_HASH_NEW';
          const save = jest.fn().mockName('save');
          const db = { user: { readRaw, save } };
          const clear = jest.fn().mockName('clear');
          const userLoader = { clear };
          const loaders = { user: userLoader };

          let compare = null;

          beforeEach(() => {
            ({ execMutation } = makeGraphqlClient(
              makeContext({ db, loaders, user: currentUser })
            ));

            compare = td.replace(Password, 'compare');
            const hash = td.replace(Password, 'hash');

            td.when(compare(passwordCurrent, passwordHash)).thenResolve(true);
            td.when(hash(passwordNew)).thenResolve(passwordHashNew);
          });

          test('saves the user self security', async () => {
            await execMutation({ mutation, variables });

            expect(save).toHaveBeenCalledWith({
              id: currentUser.id,
              passwordHash: passwordHashNew,
            });
          });

          test('clears user loader', async () => {
            await execMutation({ mutation, variables });

            expect(clear).toHaveBeenCalledWith(currentUser.id);
          });

          test('returns true', async () => {
            const response = await execMutation({ mutation, variables });
            const actual = responseToData(response);

            expect(actual).toEqual(true);
          });
        });
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
