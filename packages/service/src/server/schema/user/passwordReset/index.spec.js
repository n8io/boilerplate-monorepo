import { User, UserPasswordResetInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { addMinutes, formatISO, subMinutes } from 'date-fns/fp';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';
import { Password } from 'types/password';

describe('user password reset mutation', () => {
  const passwordNew = 'n3WP4$$word';
  const input = { ...UserPasswordResetInput.apiExample(), passwordNew };

  const mutation = gql`
    mutation UserPasswordReset($input: UserPasswordResetInput!) {
      userPasswordReset(input: $input)
    }
  `;

  describe('when user db lookup fails', () => {
    const readRaw = jest
      .fn()
      .mockName('readRaw')
      .mockImplementation(() => {
        throw new Error('db go boom');
      });

    const db = { user: { readRaw } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db })));
    });

    test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
      const variables = { input };
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
    });
  });

  describe('when user not found', () => {
    const readRaw = jest
      .fn()
      .mockName('readRaw')
      .mockResolvedValue(null);

    const db = { user: { readRaw } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db })));
    });

    test(`returns true`, async () => {
      const variables = { input };
      const response = await execMutation({ mutation, variables });
      const actual = responseToData(response);

      expect(actual).toEqual(true);
    });
  });

  describe('when user is found', () => {
    describe('and the user is deleted', () => {
      const deletedUser = {
        ...User.apiExample(),
        deletedAt: '1900-01-01T00:00:00Z',
      };

      const readRaw = jest
        .fn()
        .mockName('readRaw')
        .mockResolvedValue(deletedUser);

      const db = { user: { readRaw } };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test(`returns true`, async () => {
        const variables = { input };
        const response = await execMutation({ mutation, variables });
        const actual = responseToData(response);

        expect(actual).toEqual(true);
      });
    });

    describe('and the user is active', () => {
      const { token: passwordResetToken } = input;

      describe('and the password reset token does not match', () => {
        const passwordResetTokenInvalid = `${passwordResetToken}_INVALID`;

        let execMutation = null;

        // eslint-disable-next-line max-nested-callbacks
        beforeEach(() => {
          const user = {
            ...User.apiExample(),
            passwordResetToken: passwordResetTokenInvalid,
          };

          const readRaw = jest
            .fn()
            .mockName('readRaw')
            .mockResolvedValue(user);

          const db = { user: { readRaw } };

          ({ execMutation } = makeGraphqlClient(makeContext({ db })));
        });

        // eslint-disable-next-line max-nested-callbacks
        test(`returns a ${ErrorType.USER_PASSWORD_RESET_FAILED} error`, async () => {
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.USER_PASSWORD_RESET_FAILED);
        });
      });

      describe('and the password reset token has expired', () => {
        const inThePast = subMinutes(1, new Date());
        const passwordResetTokenExpiration = formatISO(inThePast);

        let execMutation = null;

        // eslint-disable-next-line max-nested-callbacks
        beforeEach(() => {
          const user = {
            ...User.apiExample(),
            passwordResetToken,
            passwordResetTokenExpiration,
          };

          const readRaw = jest
            .fn()
            .mockName('readRaw')
            .mockResolvedValue(user);

          const db = { user: { readRaw } };

          ({ execMutation } = makeGraphqlClient(makeContext({ db })));
        });

        // eslint-disable-next-line max-nested-callbacks
        test(`returns a ${ErrorType.USER_PASSWORD_RESET_FAILED} error`, async () => {
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.USER_PASSWORD_RESET_FAILED);
        });
      });

      describe('and is a valid password reset', () => {
        const inTheFuture = addMinutes(1, new Date());
        const passwordResetTokenExpiration = formatISO(inTheFuture);

        const user = {
          ...User.apiExample(),
          passwordResetToken,
          passwordResetTokenExpiration,
        };

        let execMutation = null;
        let hash = null;
        let save = null;

        // eslint-disable-next-line max-nested-callbacks
        beforeEach(() => {
          const readRaw = jest
            .fn()
            .mockName('readRaw')
            .mockResolvedValue(user);

          hash = td.replace(Password, 'hash');
          save = jest.fn().mockName('save');

          const db = { user: { readRaw, save } };

          ({ execMutation } = makeGraphqlClient(makeContext({ db })));
        });

        // eslint-disable-next-line max-nested-callbacks
        test('saves the new password', async () => {
          const newPasswordHash = 'NEW_PASSWORD_HASH';

          td.when(hash(passwordNew)).thenResolve(newPasswordHash);

          const variables = { input };

          await execMutation({ mutation, variables });

          expect(save).toHaveBeenCalledWith({
            id: user.id,
            passwordHash: newPasswordHash,
            passwordResetToken: null,
            passwordResetTokenExpiration: null,
          });
        });

        // eslint-disable-next-line max-nested-callbacks
        test('returns true', async () => {
          const newPasswordHash = 'NEW_PASSWORD_HASH';

          td.when(hash(passwordNew)).thenResolve(newPasswordHash);

          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);

          expect(actual).toEqual(true);
        });

        // eslint-disable-next-line max-nested-callbacks
        describe('when database save fails', () => {
          // eslint-disable-next-line max-nested-callbacks
          beforeEach(() => {
            const readRaw = jest
              .fn()
              .mockName('readRaw')
              // eslint-disable-next-line max-nested-callbacks
              .mockImplementation(() => {
                throw new Error('db go boom');
              });

            hash = td.replace(Password, 'hash');
            save = jest.fn().mockName('save');

            const db = { user: { readRaw, save } };

            ({ execMutation } = makeGraphqlClient(makeContext({ db })));
          });

          // eslint-disable-next-line max-nested-callbacks
          test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
            const variables = { input };
            const response = await execMutation({ mutation, variables });
            const errorCode = responseToErrorCode(response);

            expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
          });
        });
      });
    });
  });
});
