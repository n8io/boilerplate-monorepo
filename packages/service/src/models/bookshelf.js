import initialize from 'bookshelf';
import caseConverter from 'bookshelf-case-converter-plugin';
import { connection } from '../db';

let bookshelf = null;

const make = () => {
  if (bookshelf) return bookshelf;

  bookshelf = initialize(connection);
  bookshelf.plugin(caseConverter);

  return bookshelf;
};

export { make };
