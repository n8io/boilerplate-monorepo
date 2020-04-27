import { User, UserRecovery } from '@boilerplate-monorepo/common';
import * as ReadRaw from '../readRaw';
import { recoveryFind } from './index';

describe('recoveryFind', () => {
  let readRaw = null;

  beforeEach(() => {
    readRaw = td.replace(ReadRaw, 'readRaw');
  });

  test('returns an api user', async () => {
    const dbUser = User.dbExample();
    const { email, id } = dbUser;

    td.when(readRaw({ id })).thenResolve(dbUser);

    const actual = await recoveryFind({ id });
    const expected = UserRecovery.apiToMasked({ email, id });

    expect(actual).toEqual(expected);
  });
});
