import { User } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { makeContext, makeGraphqlClient, responseToData } from 'testHelpers';
import { Auth } from 'types/auth';

describe('user logout mutation', () => {
  const mutation = gql`
    mutation UserLogout {
      userLogout
    }
  `;

  describe('when user is logged in', () => {
    const res = { cookie: jest.fn().mockName('res.cookie') };
    const user = User.apiExample();

    let execMutation = null;
    let writeRefreshToken = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ res, user })));

      writeRefreshToken = td.replace(Auth, 'writeRefreshToken');
    });

    // eslint-disable-next-line jest/expect-expect
    test('writes the refresh token', async () => {
      await execMutation({ mutation });

      td.verify(writeRefreshToken(res));
    });

    test('returns true', async () => {
      const response = await execMutation({ mutation });
      const actual = responseToData(response);

      expect(actual).toEqual(true);
    });
  });

  describe('when user is not logged in', () => {
    const res = { cookie: jest.fn().mockName('res.cookie') };
    const user = null;

    let execMutation = null;
    let writeRefreshToken = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ res, user })));

      writeRefreshToken = td.replace(Auth, 'writeRefreshToken');
    });

    // eslint-disable-next-line jest/expect-expect
    test('writes the refresh token', async () => {
      await execMutation({ mutation });

      td.verify(writeRefreshToken(res));
    });

    test('returns true', async () => {
      const response = await execMutation({ mutation });
      const actual = responseToData(response);

      expect(actual).toEqual(true);
    });
  });
});
