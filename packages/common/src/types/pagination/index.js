import { cursorToAfter, nodesToPaginatedResults } from './transforms';
import { Enumeration } from './typedef';

const Pagination = {
  ...Enumeration,
  cursorToAfter,
  nodesToPaginatedResults,
};

export { Pagination };
