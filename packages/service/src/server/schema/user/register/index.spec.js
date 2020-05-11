/* eslint-disable max-nested-callbacks */
import { User, UserRegisterInput } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import {
  makeContext,
  makeGraphqlClient,
  responseToData,
  responseToErrorCode,
} from 'testHelpers';
import { Captcha } from 'types/captcha';
import { ErrorType } from 'types/errorType';
import { Password } from 'types/password';

describe('user register mutation', () => {
  const input = UserRegisterInput.apiExample();
  const { captchaToken } = input;
  const variables = { input };

  const mutation = gql`
    mutation UserRegister($input: UserRegisterInput!) {
      userRegister(input: $input)
    }
  `;

  describe('when captcha is not valid', () => {
    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext()));

      const isTokenValid = td.replace(Captcha, 'isTokenValid');

      td.when(isTokenValid(captchaToken)).thenResolve({
        'error-codes': ['INVALID_CAPTCHA'],
        success: false,
      });
    });

    test(`returns a ${ErrorType.CAPTCHA_ERROR} error`, async () => {
      const response = await execMutation({ mutation, variables });
      const errorCode = responseToErrorCode(response);

      expect(errorCode).toEqual(ErrorType.CAPTCHA_ERROR);
    });
  });

  describe('when the captcha is valid', () => {
    beforeEach(() => {
      const isTokenValid = td.replace(Captcha, 'isTokenValid');

      td.when(isTokenValid(captchaToken)).thenResolve({ success: true });
    });

    describe('when user db lookup fails', () => {
      const read = jest
        .fn()
        .mockName('read')
        .mockImplementation(() => {
          throw new Error('db go boom');
        });

      const db = { user: { read } };

      let execMutation = null;

      beforeEach(() => {
        ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
      });

      test(`returns a ${ErrorType.DATABASE_ERROR_OCCURRED} error`, async () => {
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.DATABASE_ERROR_OCCURRED);
      });
    });

    describe('when a matching user is found', () => {
      const user = User.apiExample({ username: input.username });

      let execMutation = null;

      beforeEach(() => {
        const read = jest.fn().mockName('read').mockResolvedValue(user);

        const db = { user: { read } };

        ({ execMutation } = makeGraphqlClient(makeContext({ db })));
      });

      test(`returns a ${ErrorType.USER_REGISTER_FAILED} error`, async () => {
        const response = await execMutation({ mutation, variables });
        const errorCode = responseToErrorCode(response);

        expect(errorCode).toEqual(ErrorType.USER_REGISTER_FAILED);
      });
    });

    describe('when user not found', () => {
      const passwordHash = 'PASSWORD_HASH';
      const user = null;

      const read = jest.fn().mockName('read').mockResolvedValue(user);

      describe('and user is saved', () => {
        const register = jest.fn().mockName('register');

        const db = { user: { read, register } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(makeContext({ db, user })));

          const hash = td.replace(Password, 'hash');

          td.when(hash(input.passwordNew)).thenResolve(passwordHash);
        });

        test('returns true', async () => {
          const response = await execMutation({ mutation, variables });
          const actual = responseToData(response);

          expect(actual).toEqual(true);
        });
      });

      describe('and the user db register fails', () => {
        const register = jest
          .fn()
          .mockName('register')
          .mockImplementation(() => {
            throw new Error('db go boom');
          });

        const db = { user: { read, register } };

        let execMutation = null;

        beforeEach(() => {
          ({ execMutation } = makeGraphqlClient(makeContext({ db, user })));
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
