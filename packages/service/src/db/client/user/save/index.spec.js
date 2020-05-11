import { User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { save } from './index';

describe('save', () => {
  const user = User.apiExample();
  const { id } = user;

  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  test(`saves a user`, async () => {
    const dbUser = User.dbExample({ id });

    tracker.on('query', (query, step) => {
      switch (step) {
        case 1:
          expect(query.sql).toEqual(
            `update \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` set \`email\` = ?, \`family_name\` = ?, \`given_name\` = ?, \`role\` = ?, \`username\` = ?, \`name\` = ?, \`updated_at\` = ? where \`id\` = ?`
          );

          query.response(dbUser);

          break;
        case 2:
          expect(query.sql).toEqual(
            `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` = ? limit ?`
          );

          query.response(dbUser);

          break;
        default:
          break;
      }
    });

    const actual = await save(user);

    expect(actual).toEqual(user);
  });
});
