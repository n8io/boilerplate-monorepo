import { User } from '@boilerplate-monorepo/common';
import * as ReadRaw from '../readRaw';
import { readPaginated } from './index';

describe('readPaginated', () => {
  let readRaw = null;

  beforeEach(() => {
    readRaw = td.replace(ReadRaw, 'readRaw');
  });

  test('returns a api users', async () => {
    const dbUser = User.dbExample();
    const users = [dbUser];
    const apiUsers = users.map(User.dbToApi);

    td.when(readRaw({ includeDeleted: false })).thenResolve({
      pagination: {},
      users,
    });

    const actual = await readPaginated();

    expect(actual).toEqual({ pagination: {}, users: apiUsers });
  });
});
