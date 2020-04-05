import initialize from 'bookshelf';
import caseConverter from 'bookshelf-case-converter-plugin';
import { connection } from '../db';
import paginator from './paginator';

let bookshelf = null;

const make = () => {
  if (bookshelf) return bookshelf;

  bookshelf = initialize(connection);
  bookshelf.plugin(caseConverter);
  bookshelf.plugin(paginator);

  return bookshelf;
};

export { make };
