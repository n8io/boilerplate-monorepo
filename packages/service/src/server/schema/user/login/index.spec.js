import { User } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { Auth } from 'types/auth';
import { ErrorType } from 'types/errorType';
import { Password } from 'types/password';

describe('user login mutation', () => {
  const password = 'PASSWORD';
  const username = 'USERNAME';

  const mutation = gql`
    mutation UserLogin($input: UserLoginInput!) {
      userLogin(input: $input)
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

    test(`returns a ${ErrorType.FAILED_LOGIN} error`, async () => {
      const input = { password, username };
      const variables = { input };
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.FAILED_LOGIN);
    });
  });

  describe('when user not found', () => {
    const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(null);

    const db = { user: { readRaw } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
    });

    test(`returns a ${ErrorType.FAILED_LOGIN} error`, async () => {
      const input = { password, username };
      const variables = { input };
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.FAILED_LOGIN);
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
        ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
      });

      test(`returns a ${ErrorType.FAILED_LOGIN} error`, async () => {
        const input = { password, username };
        const variables = { input };
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.FAILED_LOGIN);
      });
    });

    describe('and the user is active', () => {
      describe('and the password is not correct', () => {
        let execMutation = null;

        // eslint-disable-next-line max-nested-callbacks
        beforeEach(async () => {
          const passwordHash = await Password.hash(`${password}_INVALID`);
          const user = { ...User.apiExample(), passwordHash };

          const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

          const db = { user: { readRaw } };

          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, user: null })
          ));
        });

        // eslint-disable-next-line max-nested-callbacks
        test(`returns a ${ErrorType.FAILED_LOGIN} error`, async () => {
          const input = { password, username };
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const errorCode = responseToErrorCode(response);

          expect(errorCode).toEqual(ErrorType.FAILED_LOGIN);
        });
      });

      describe('and the password is correct', () => {
        const res = { cookie: jest.fn().mockName('res.cookie') };

        let execMutation = null;
        let user = null;
        let writeRefreshToken = null;

        // eslint-disable-next-line max-nested-callbacks
        beforeEach(async () => {
          const passwordHash = await Password.hash(password);

          user = { ...User.apiExample(), passwordHash };

          const readRaw = jest.fn().mockName('readRaw').mockResolvedValue(user);

          const db = { user: { readRaw } };

          ({ execMutation } = makeGraphqlClient(
            makeContext({ db, res, user: null })
          ));

          writeRefreshToken = td.replace(Auth, 'writeRefreshToken');
        });

        // eslint-disable-next-line max-nested-callbacks,jest/expect-expect
        test(`writes the refresh token`, async () => {
          const input = { password, username };
          const variables = { input };

          await execMutation({ mutation, variables });

          td.verify(writeRefreshToken(res, user));
        });

        // eslint-disable-next-line max-nested-callbacks
        test(`returns an access token`, async () => {
          const input = { password, username };
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);
          const expected = Auth.encryptAccessToken(user);

          expect(actual).toEqual(expected);
        });

        // eslint-disable-next-line max-nested-callbacks
        test(`returns the proper access token object`, async () => {
          const input = { password, username };
          const variables = { input };
          const response = await execMutation({ mutation, variables });
          const accessToken = responseToData(response);
          const actual = Auth.decryptAccessToken(accessToken);

          expect(actual).toMatchObject({
            email: user.email,
            id: user.id,
            role: user.role,
            username: user.username,
          });
        });
      });
    });
  });
});
