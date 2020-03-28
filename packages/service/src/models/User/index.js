import { Db } from 'types/db';
import { make as makeBookshelf } from '../bookshelf';

const bookshelf = makeBookshelf();

const User = bookshelf.model('User', {
  hasTimestamps: true,
  tableName: `${Db.Schema.MAIN}.users`,
});

export { User };
