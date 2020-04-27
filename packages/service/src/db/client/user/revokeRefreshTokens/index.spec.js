import { User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { revokeRefreshTokens } from './index';

describe('revokeRefreshTokens', () => {
  const { id } = User.apiExample();

  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  test(`revokes the user's refresh token`, async () => {
    tracker.on('query', (query, step) => {
      switch (step) {
        case 1:
          expect(query.sql).toEqual(
            `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` = ? limit ?`
          );

          query.response(User.dbExample({ id }));

          break;
        case 2:
          expect(query.sql).toEqual(
            `update \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` set \`token_version\` = ?, \`updated_at\` = ? where \`id\` = ?`
          );

          query.response(User.dbExample());

          break;
        case 3:
          expect(query.sql).toEqual(
            `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` = ? limit ?`
          );

          query.response(User.dbExample({ id }));

          break;
        default:
          break;
      }
    });

    await revokeRefreshTokens(id);
  });
});
