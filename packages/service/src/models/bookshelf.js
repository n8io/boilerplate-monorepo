import initialize from 'bookshelf';
import caseConverter from 'bookshelf-case-converter-plugin';
import cursorPagination from 'bookshelf-cursor-pagination';
import { connection } from '../db';

let bookshelf = null;

const make = () => {
  if (bookshelf) return bookshelf;

  bookshelf = initialize(connection);
  bookshelf.plugin(caseConverter);
  bookshelf.plugin(cursorPagination);

  return bookshelf;
};

export { make };
