import { Pagination, User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { readRaw } from './index';

describe('users readRaw', () => {
  const user = User.dbExample();

  const defaultInput = {
    after: undefined,
    first: undefined,
    includeDeleted: undefined,
  };

  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  describe('when passing no inputs', () => {
    test('queries raw users', async () => {
      tracker.on('query', (query, step) => {
        switch (step) {
          case 1:
            expect(query.sql).toEqual(
              `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` order by \`main\`.\`${Db.Table.USERS}\`.\`family_name\` ASC, \`main\`.\`${Db.Table.USERS}\`.\`given_name\` ASC, \`main\`.\`${Db.Table.USERS}\`.\`id\` ASC limit ?`
            );

            query.response([user]);

            break;
          case 2:
            expect(query.sql).toEqual(
              `select count(distinct \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\`) from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\``
            );

            query.response(1);

            break;
          default:
            break;
        }
      });

      const actual = await readRaw();

      expect(actual).toMatchObject({
        pagination: {
          hasMore: false,
          limit: Pagination.PAGE_SIZE_DEFAULT,
          rowCount: NaN,
        },
        users: [User.dbToApi(user)],
      });
    });
  });

  describe('when passing after', () => {
    const after = 'Q2xhcms6On46Ok5hdGU6On46OmNrOTY3b284cTAwMDAwb2ZrNDdkMzdld3c';

    test('queries raw users with the "after" cursor', async () => {
      tracker.on('query', (query, step) => {
        switch (step) {
          case 1:
            expect(query.sql).toEqual(
              `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (((\`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` > ? or \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` is null)) or ((\`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`given_name\` > ? or \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`given_name\` is null) and \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` = ?) or ((\`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` > ? or \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` is null) and \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` = ? and \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`given_name\` = ?)) order by \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` ASC, \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`given_name\` ASC, \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` ASC limit ?`
            );

            query.response([user]);

            break;
          case 2:
            expect(query.sql).toEqual(
              `select count(distinct \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\`) from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\``
            );

            query.response(1);

            break;
          default:
            break;
        }
      });

      const actual = await readRaw({
        ...defaultInput,
        after,
      });

      expect(actual).toMatchObject({
        pagination: {
          hasMore: false,
          limit: Pagination.PAGE_SIZE_DEFAULT,
          rowCount: NaN,
        },
        users: [User.dbToApi(user)],
      });
    });
  });

  describe('when passing first', () => {
    const first = 3;

    test('queries raw users with a limit', async () => {
      tracker.on('query', (query, step) => {
        switch (step) {
          case 1:
            expect(query.sql).toEqual(
              `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` order by \`main\`.\`${Db.Table.USERS}\`.\`family_name\` ASC, \`main\`.\`${Db.Table.USERS}\`.\`given_name\` ASC, \`main\`.\`${Db.Table.USERS}\`.\`id\` ASC limit ?`
            );

            query.response([user]);

            break;
          case 2:
            expect(query.sql).toEqual(
              `select count(distinct \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\`) from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\``
            );

            query.response(1);

            break;
          default:
            break;
        }
      });

      const actual = await readRaw({
        ...defaultInput,
        first,
      });

      expect(actual).toMatchObject({
        pagination: {
          hasMore: false,
          limit: first,
          rowCount: NaN,
        },
        users: [User.dbToApi(user)],
      });
    });
  });

  describe('when excluding deleted users', () => {
    const includeDeleted = false;

    test('queries raw users including deleted', async () => {
      tracker.on('query', (query, step) => {
        switch (step) {
          case 1:
            expect(query.sql).toEqual(
              `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`deleted_at\` is null or \`deleted_at\` > ? order by \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`family_name\` ASC, \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`given_name\` ASC, \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\` ASC limit ?`
            );

            query.response([user]);

            break;
          case 2:
            expect(query.sql).toEqual(
              `select count(distinct \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.\`id\`) from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`deleted_at\` is null or \`deleted_at\` > ?`
            );

            query.response(1);

            break;
          default:
            break;
        }
      });

      const actual = await readRaw({
        ...defaultInput,
        includeDeleted,
      });

      expect(actual).toMatchObject({
        pagination: {
          hasMore: false,
          limit: Pagination.PAGE_SIZE_DEFAULT,
          rowCount: NaN,
        },
        users: [User.dbToApi(user)],
      });
    });
  });
});
