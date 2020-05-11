import { User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { read } from './index';

describe('users read', () => {
  const user1 = User.apiExample({ id: 'ID_1' });
  const user2 = User.apiExample({ id: 'ID_2' });
  const users = [user1, user2];
  const ids = [user1.id, user2.id];
  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  test('queries users', async () => {
    tracker.on('query', (query) => {
      expect(query.sql).toEqual(
        `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`id\` in (?, ?) and \`deleted_at\` is null or \`deleted_at\` > ?`
      );

      query.response(users);
    });

    const actual = await read(ids);

    expect(actual).toEqual(users);
  });
});
