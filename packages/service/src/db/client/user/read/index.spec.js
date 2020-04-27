import { User } from '@boilerplate-monorepo/common';
import * as ReadRaw from '../readRaw';
import { read } from './index';

describe('read', () => {
  let readRaw = null;

  beforeEach(() => {
    readRaw = td.replace(ReadRaw, 'readRaw');
  });

  test('returns an api user', async () => {
    const dbUser = User.dbExample();
    const { id } = dbUser;
    const user = User.apiExample({ id });

    td.when(readRaw({ id })).thenResolve(dbUser);

    const actual = await read({ id });

    expect(actual).toEqual(user);
  });
});
