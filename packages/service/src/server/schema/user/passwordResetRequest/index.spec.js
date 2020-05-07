/* eslint-disable max-nested-callbacks */
import { UserRecoveryNotifyMethod, User } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { parseISO } from 'date-fns/fp';
import * as Email from 'email/user/passwordReset';
import {
  makeContext,
  makeGraphqlClient,
  responseToErrorCode,
  responseToData,
} from 'testHelpers';
import { Auth } from 'types/auth';
import { ErrorType } from 'types/errorType';

describe('user password reset request mutation', () => {
  const input = {
    id: 'ID',
    notificationMethod: UserRecoveryNotifyMethod.EMAIL,
  };

  const mutation = gql`
    mutation UserPasswordResetRequest($input: UserPasswordResetRequestInput!) {
      userPasswordResetRequest(input: $input)
    }
  `;

  let passwordReset = null;

  beforeEach(() => {
    passwordReset = td.replace(Email, 'passwordReset');
  });

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
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
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

  describe('when a user is found', () => {
    const user = User.dbExample();

    describe('and the database save throws an error', () => {
      let execMutation = null;
      let save = null;

      beforeEach(() => {
        const readRaw = jest
          .fn()
          .mockName('readRaw')
          .mockResolvedValue(user);

        save = jest
          .fn()
          .mockName('save')

          .mockImplementation(() => {
            throw new Error('db go boom');
          });

        const db = { user: { readRaw, save } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
        const variables = { input };
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
      });
    });

    describe('and the database save is successful', () => {
      const passwordResetToken = 'RESET_TOKEN';
      const passwordResetTokenExpiration = parseISO('2099-12-31T23:59:59Z');

      let execMutation = null;
      let save = null;

      beforeEach(() => {
        const readRaw = jest
          .fn()
          .mockName('readRaw')
          .mockResolvedValue(user);

        save = jest
          .fn()
          .mockName('save')
          .mockResolvedValue(null);

        const db = { user: { readRaw, save } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));

        const generateResetToken = td.replace(Auth, 'generateResetToken');

        const generateResetTokenExpiration = td.replace(
          Auth,
          'generateResetTokenExpiration'
        );

        td.when(generateResetToken()).thenReturn(passwordResetToken);

        td.when(generateResetTokenExpiration()).thenReturn(
          passwordResetTokenExpiration
        );
      });

      test('should have made the proper save call', async () => {
        const variables = { input };

        await execMutation({ mutation, variables });

        expect(save).toHaveBeenCalledWith({
          id: user.id,
          passwordResetToken,
          passwordResetTokenExpiration,
        });
      });

      describe('and password reset email send fails', () => {
        beforeEach(() => {
          passwordReset = td.replace(Email, 'passwordReset');

          td.when(passwordReset({ passwordResetToken, user })).thenReject();
        });

        test(`returns a ${ErrorType.EMAIL_SEND_ERROR} error`, async () => {
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.EMAIL_SEND_ERROR);
        });
      });

      describe('and password reset email send succeeds', () => {
        test('should return true', async () => {
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);

          expect(actual).toEqual(true);
        });
      });
    });
  });
});
/* eslint-enable max-nested-callbacks */
