import { Utils } from '@boilerplate-monorepo/common';

const cursorExample = () =>
  'Q2xhcms6On46Ok5hdGU6On46OmNrOTY3b284cTAwMDAwb2ZrNDdkMzdld3c';

const nodeExample = Utils.makeSafeExample({
  id: 'ID',
});

const paginationExample = Utils.makeSafeExample({
  hasMore: false,
  rowCount: 1,
});

export { cursorExample, nodeExample, paginationExample };
