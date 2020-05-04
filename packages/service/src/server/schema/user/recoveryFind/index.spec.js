import { User, UserRecovery } from '@boilerplate-monorepo/common';
import { gql } from 'apollo-server-express';
import { pick, pipe } from 'ramda';
import { makeContext, makeGraphqlClient, responseToData } from 'testHelpers';

describe('user recovery find query', () => {
  const account = 'ACCOUNT';

  const query = gql`
    query UserRecoveryFind($account: String!) {
      userRecoveryFind(account: $account) {
        email
        id
      }
    }
  `;

  describe('when user db lookup fails', () => {
    const recoveryFind = jest
      .fn()
      .mockName('recoveryFind')
      .mockImplementation(() => {
        throw new Error('db go boom');
      });

    const db = { user: { recoveryFind } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
    });

    test(`returns null`, async () => {
      const variables = { account };
      const response = await execMutation({ query, variables });
      const actual = responseToData(response);

      expect(actual).toBeNull();
    });
  });

  describe('when user not found', () => {
    const user = null;

    const recoveryFind = jest
      .fn()
      .mockName('recoveryFind')
      .mockResolvedValue(user);

    const db = { user: { recoveryFind } };

    let execMutation = null;

    beforeEach(() => {
      ({ execMutation } = makeGraphqlClient(makeContext({ db, user: null })));
    });

    test(`returns null`, async () => {
      const variables = { account };
      const response = await execMutation({ query, variables });
      const actual = responseToData(response);

      expect(actual).toBeNull();
    });
  });

  describe('when user is found', () => {
    const user = User.apiExample();

    let execMutation = null;

    beforeEach(() => {
      const recoveryFind = jest
        .fn()
        .mockName('recoveryFind')
        .mockResolvedValue(user);

      const db = { user: { recoveryFind } };

      ({ execMutation } = makeGraphqlClient(makeContext({ db })));
    });

    test('returns the masked user', async () => {
      const variables = { account };
      const response = await execMutation({ query, variables });
      const actual = responseToData(response);

      const expected = pipe(
        UserRecovery.apiToMasked,
        pick(['email', 'id'])
      )(user);

      expect(actual).toEqual(expected);
    });
  });
});
