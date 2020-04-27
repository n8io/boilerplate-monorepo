import { User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { register } from './index';

describe('register', () => {
  const user = User.apiExample();

  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  test('returns true', async () => {
    tracker.on('query', (query, step) => {
      switch (step) {
        case 1:
          expect(query.sql).toEqual(
            `insert into \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` (\`created_at\`, \`email\`, \`family_name\`, \`given_name\`, \`id\`, \`name\`, \`role\`, \`token_version\`, \`updated_at\`, \`username\`) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          );
          query.response(User.dbExample());
          break;
        case 2:
          expect(query.sql).toEqual(
            `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` = ? limit ?`
          );
          query.response(User.dbExample());
          break;
        default:
          break;
      }
    });

    const actual = await register(user);

    expect(actual).toEqual(true);
  });
});
