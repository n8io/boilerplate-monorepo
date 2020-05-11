import { User } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { addMinutes, formatISO, subMinutes } from 'date-fns/fp';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { ErrorType } from 'types/errorType';

describe('user password reset token validate query', () => {
  const token = 'TOKEN';
  const input = { token };

  const query = gql`
    query UserPasswordResetTokenValidate(
      $input: UserPasswordResetTokenValidateInput!
    ) {
      userPasswordResetTokenValidate(input: $input)
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
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
    });

    test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
      const variables = { input };
      const response = await execMutation({ query, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
    });
  });

  describe('when user not found', () => {
    const user = null;

    const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

    const db = { user: { readRaw } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
    });

    test(`returns null`, async () => {
      const variables = { input };
      const response = await execMutation({ query, variables });
      const actual = responseToData(response);

      expect(actual).toBeNull();
    });
  });

  describe('when user is found', () => {
    describe('and the password reset token is null', () => {
      const passwordResetToken = null;
      const passwordResetTokenExpiration = null;

      const user = {
        ...User.apiExample(),
        passwordResetToken,
        passwordResetTokenExpiration,
      };

      let execMutation = null;

      beforeEach(() => {
        const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

        const db = { user: { readRaw } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test('returns null', async () => {
        const variables = { input };
        const response = await execMutation({ query, variables });
        const actual = responseToData(response);

        expect(actual).toBeNull();
      });
    });

    describe('and the password reset token has expired', () => {
      const inThePast = subMinutes(1, new Date());
      const passwordResetToken = token;
      const passwordResetTokenExpiration = formatISO(inThePast);

      const user = {
        ...User.apiExample(),
        passwordResetToken,
        passwordResetTokenExpiration,
      };

      let execMutation = null;

      beforeEach(() => {
        const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

        const db = { user: { readRaw } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test('returns null', async () => {
        const variables = { input };
        const response = await execMutation({ query, variables });
        const actual = responseToData(response);

        expect(actual).toBeNull();
      });
    });

    describe('and the password reset token is valid', () => {
      const inTheFuture = addMinutes(1, new Date());
      const passwordResetToken = token;
      const passwordResetTokenExpiration = formatISO(inTheFuture);

      const user = {
        ...User.apiExample(),
        passwordResetToken,
        passwordResetTokenExpiration,
      };

      let execMutation = null;

      beforeEach(() => {
        const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

        const db = { user: { readRaw } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test(`returns the user's id`, async () => {
        const variables = { input };
        const response = await execMutation({ query, variables });
        const actual = responseToData(response);

        expect(actual).toEqual(user.id);
      });
    });
  });
});
