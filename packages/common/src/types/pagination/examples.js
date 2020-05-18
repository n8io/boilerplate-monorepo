import { makeSafeExample } from 'utils/makeSafeExample';

const cursorExample = () =>
  'Q2xhcms6On46Ok5hdGU6On46OmNrOTY3b284cTAwMDAwb2ZrNDdkMzdld3c';

const nodeExample = makeSafeExample({
  id: 'ID',
});

const pageInfoExample = makeSafeExample({
  endCursor: cursorExample(),
  hasMore: false,
  rowCount: 1,
});

const apiPageInfoExample = makeSafeExample({
  endCursor: cursorExample(),
  hasNextPage: false,
  total: 1,
});

const edgeExample = makeSafeExample({
  cursor: cursorExample(),
  node: nodeExample(),
});

const apiExample = makeSafeExample({
  edges: [edgeExample()],
  pageInfo: apiPageInfoExample(),
});

export { apiExample, cursorExample, nodeExample, pageInfoExample };
