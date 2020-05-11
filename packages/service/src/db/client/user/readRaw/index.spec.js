import { User } from '@boilerplate-monorepo/common';
import knexMock from 'mock-knex';
import { Db } from 'types/db';
import { readRaw } from './index';

// eslint-disable-next-line max-statements
describe('readRaw', () => {
  const user = User.apiExample();
  const { email, id, username } = user;
  const passwordResetToken = 'PASSWORD_RESET_TOKEN';

  let tracker = null;

  beforeEach(() => {
    tracker = knexMock.getTracker();
    tracker.install();
  });

  afterEach(() => {
    tracker && tracker.uninstall();
  });

  test('returns null when no keys are provided', async () => {
    expect(await readRaw()).toBeNull();
  });

  describe('when including deleted users', () => {
    const includeDeleted = true;

    test('queries deleted users', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where \`id\` = ?`
        );

        query.response();
      });

      await readRaw({ id, includeDeleted });
    });
  });

  describe('when excluding deleted users', () => {
    const includeDeleted = false;

    test('does not query deleted users', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and \`id\` = ?`
        );

        query.response();
      });

      await readRaw({ id, includeDeleted });
    });
  });

  describe('when providing an id with other keys', () => {
    test('queries by id only', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and \`id\` = ?`
        );

        query.response();
      });

      await readRaw({ email, id, username });
    });
  });

  describe('when providing an email only', () => {
    test('queries by email only', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and \`email\` = ?`
        );

        query.response();
      });

      await readRaw({ email });
    });
  });

  describe('when providing username only', () => {
    test('queries by username only', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and \`username\` = ?`
        );

        query.response();
      });

      await readRaw({ username });
    });
  });

  describe('when providing passwordResetToken only', () => {
    test('queries by passwordResetToken only', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and \`password_reset_token\` = ?`
        );

        query.response();
      });

      await readRaw({ passwordResetToken });
    });
  });

  describe('when providing both email and username', () => {
    test('queries by either email or username', async () => {
      tracker.on('query', (query) => {
        expect(query.sql).toEqual(
          `select \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\`.* from \`${Db.Schema.MAIN}\`.\`${Db.Table.USERS}\` where (\`deleted_at\` is null or \`deleted_at\` > ?) and (\`email\` = ? or (\`username\` = ?))`
        );

        query.response();
      });

      await readRaw({ email, username });
    });
  });
});
